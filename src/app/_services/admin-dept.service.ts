import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dept } from '../_model/department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDeptService {

  constructor(private httpClient:HttpClient) { }
  public getAllEmployees():Observable<Dept[]>
  {
    return this.httpClient.get<Dept[]>('http://localhost:8081/admin/departments');
  }
}
