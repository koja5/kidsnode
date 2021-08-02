import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CallApiService {
  constructor(private http: HttpClient) {}

  callPostMethod(api: string, data: any) {
    return this.http.post(api, data);
  }

  callGetMethod(api: string, data: string) {
    return this.http.get(api + '/' + data);
  }
}
