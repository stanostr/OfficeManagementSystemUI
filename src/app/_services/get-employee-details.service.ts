import { Injectable } from '@angular/core';
import { Employee } from '../_model/employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetEmployeeDetailsService {
  constructor(private httpClient:HttpClient) { }

  public getAccount()
  {
    return this.httpClient.get<Employee>('http://localhost:8081/employee/account');
  }
}
