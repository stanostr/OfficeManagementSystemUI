import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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


  public deleteTask(task:Task)
  {
    return this.httpClient.delete('http://localhost:8081/admin/tasks/' + task.id);
  }

  public addTask(task:Task):Observable<HttpResponse<Task>>
  {
    return this.httpClient.post<HttpResponse<Task>>('http://localhost:8081/admin/employees/' +
    task.employeeId +'/tasks', task);
  }

  public updateTask(task:Task):Observable<HttpResponse<any>>
  {
    return this.httpClient.put<HttpResponse<any>>('http://localhost:8081/admin/tasks/' + task.id, task);
  }
}

