import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  public get getToken() {
    return {
      'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2Mjc5Mzg4NDksImV4cCI6MTYyNzk4MjA0OX0.50jcMrF9ITWCHhbGzuzK2wXvBY6HIZMZtrbspAIYkvI',
    };
  }
}
