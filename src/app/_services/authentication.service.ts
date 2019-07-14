import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map'

class LoginResponse {
  constructor(public token: string, public role: string) { }
}

class LoginRequest {
  constructor(public username: string, public password: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Observable<HttpResponse<LoginResponse>> {
    sessionStorage.removeItem('token'); //remove any data that is still persisted
    sessionStorage.removeItem('role'); //remove any data that is still persisted
    const request = new LoginRequest(username, password);
    
    return this.httpClient.post<LoginResponse>('http://localhost:8081/login', request, {observe: 'response'}).map(loginResponse => {
      if(loginResponse.ok)
      {
        sessionStorage.setItem('token' , loginResponse.body.token);
        sessionStorage.setItem('role' , loginResponse.body.role);
      }
      return loginResponse;
    });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('token')
    return !(user == null)
  }

  logOut() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role');
  }
}
