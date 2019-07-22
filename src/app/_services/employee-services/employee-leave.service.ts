import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LeaveRequest } from 'src/app/_model/leave-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveService {

  constructor(private httpClient:HttpClient) { }

  getMyRequests():Observable<LeaveRequest[]>
  {
    return this.httpClient.get<LeaveRequest[]>('http://localhost:8081/employee/leave_requests');
  }

  postRequest(request:LeaveRequest):Observable<HttpResponse<any>>
  {
    return this.httpClient.post<LeaveRequest>('http://localhost:8081/employee/leave_requests', request, {observe: 'response'});
  }

  deleteRequest(request:LeaveRequest):Observable<HttpResponse<any>>
  {
    return this.httpClient.delete<LeaveRequest>('http://localhost:8081/employee/leave_requests/'+ request.id, {observe: 'response'});
  }
}
