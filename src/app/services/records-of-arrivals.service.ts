import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RecordsOfArrivalsService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.headers = new HttpHeaders(this.auth.getToken);
  }

  recordAbsense(data: any) {
    return this.http.post('/api/recordAbsense', data);
  }
}
