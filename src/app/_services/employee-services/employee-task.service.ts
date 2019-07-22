import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/_model/task';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTaskService {

  constructor(private httpClient:HttpClient) { }

  getMyTasks():Observable<Task[]>
  {
    return this.httpClient.get<Task[]>('http://localhost:8081/employee/tasks');
  }

  updateTask(task:Task):Observable<HttpResponse<any>>
  {
    return this.httpClient.put('http://localhost:8081/employee/tasks/'+task.id, null, {observe:'response'});
  }
}
