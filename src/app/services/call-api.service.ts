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
    return this.http.get(api + '/' + data, { headers: this.headers });
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
