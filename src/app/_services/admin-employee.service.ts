import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../_model/employee';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminEmployeeService {

  constructor(private httpClient:HttpClient) { }

  public getAllEmployees():Observable<Employee[]>
  {
    return this.httpClient.get<Employee[]>('http://localhost:8081/admin/employees');
  }

  public deleteEmployee(employee: Employee)
  {
      return this.httpClient.delete('http://localhost:8081/admin/employees/' + employee.id);
  }

  public addUser(employee: Employee): Observable<HttpResponse<Employee>>
  {
    return this.httpClient.post<Employee>('http://localhost:8081/admin/employees/', employee, {observe: 'response'});
  }

  public updateEmployee(employee:Employee):Observable<HttpResponse<Employee>>
  {
    return this.httpClient.put<Employee>('http://localhost:8081/admin/employees/', employee, {observe: 'response'});
  }
}
