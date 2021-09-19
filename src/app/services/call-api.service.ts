import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CallApiService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
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
}
