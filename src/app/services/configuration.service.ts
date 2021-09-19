import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }

  getConfiguration(path: string, file: string) {
    return this.http.get("../../assets/configurations/" + path + "/" + file);
  }

  getLanguage(language: string) {
    return this.http.get("../../assets/configurations/languages/" + language + '.json');
  }
}
