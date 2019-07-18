import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../_model/employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminEmployeeService {

  constructor(private httpClient:HttpClient) { }

  public getAllEmployees():Observable<Employee[]>
  {
    return this.httpClient.get<Employee[]>('http://localhost:8081/admin/employees');
  }
}
