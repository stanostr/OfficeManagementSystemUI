import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../_model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminTaskService {

  constructor(private httpClient:HttpClient) { }

  public getTasks():Observable<Task[]>
  {
    return this.httpClient.get<Task[]>('http://localhost:8081/admin/tasks');
  }
}
