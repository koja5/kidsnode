import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { HelpService } from './help.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrComponent } from '../components/dynamic-component/common/toastr/toastr.component';

@Injectable({
  providedIn: 'root',
})
export class CallApiService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private helpService: HelpService
  ) {
    this.headers = new HttpHeaders(this.auth.getToken);
  }

  // with authorizations
  callPostMethod(api: string, data: any) {
    return this.http.post(api, data, { headers: this.headers });
  }

  callGetMethod(api: string, data: string) {
    if (data === undefined) {
      data = '';
    }
    const url = api.endsWith('/') ? api + data : api + '/' + data;
    return this.http.get(url, { headers: this.headers });
  }

  packParametarPost(data: any, fields: any) {
    let model = [];
    if (fields) {
      for (let i = 0; i < fields.length; i++) {
        model[fields[i].name] = data[fields[i].path];
      }
      return model;
    } else {
      return {};
    }
  }

  packParametarGet(data: any, fields: any) {
    let model = [];
    if (fields) {
      for (let i = 0; i < fields.length; i++) {
        model.push(data[fields[i]]);
      }
    }

    return model.toString();
  }

  downloadDocument(body: any) {
    return this.http.post('/api/upload/downloadDocument', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  getDocument(body: any) {
    return this.http.post('/api/upload/getDocument', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  callApi(data: any, router?: any) {
    if (data.type === 'POST') {
      if (data.request.url) {
        data.body = this.helpService.postRequestDataParameters(
          data.body,
          router.snapshot.params,
          data.request.url
        );
      }
      return this.callPostMethod(data.request.api, data.body);
    } else {
      if (data.request.url) {
        const dataValue = this.helpService.getRequestDataParameters(
          router.snapshot.params,
          data.request.url
        );
        return this.callGetMethod(data.request.api, dataValue);
      } else {
        const dataValue = this.helpService.getRequestDataParameters(
          router.snapshot.params,
          data.request.parameters
        );
        return this.callGetMethod(data.request.api, dataValue);
      }
    }
  }

  callServerMethod(request: any, data: any, router?: any) {
    if (request.url) {
      data = this.helpService.postRequestDataParameters(
        data,
        router.snapshot.params,
        request.url
      );
    }
    if (request.type === 'POST') {
      return this.callPostMethod(request.api, data);
    } else {
      return this.callGetMethod(request.api, data);
    }
  }
}
