import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Dept } from '../_model/department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDeptService {

  constructor(private httpClient:HttpClient) { }
  public getAllDepartments():Observable<Dept[]>
  {
    return this.httpClient.get<Dept[]>('http://localhost:8081/admin/departments');
  }

  public deleteDepartment(department: Dept)
  {
    return this.httpClient.delete('http://localhost:8081/admin/departments/' + department.id);
  }

  public addDepartment(dept: Dept):Observable<HttpResponse<Dept>>
  {
    return this.httpClient.post<Dept>('http://localhost:8081/admin/departments/', dept, {observe: 'response'});
  }

  public updateDepartment(dept: Dept):Observable<HttpResponse<Dept>>
  {
    return this.httpClient.put<Dept>('http://localhost:8081/admin/departments', dept, {observe: 'response'});
  }
}
