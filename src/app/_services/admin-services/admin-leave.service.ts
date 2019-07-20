import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from 'src/app/_model/leave-request';

@Injectable({
  providedIn: 'root'
})
export class AdminLeaveService {

  constructor(private httpClient:HttpClient) { }

  public getAllRequests():Observable<LeaveRequest[]>
  {
    return this.httpClient.get<LeaveRequest[]>('http://localhost:8081/admin/leave_requests');
  }

  public getRequestsByStatus(status:string):Observable<LeaveRequest[]>
  {
    return this.httpClient.get<LeaveRequest[]>('http://localhost:8081/admin/leave_requests/'+ status);
  }
  
  public deleteRequest(request:LeaveRequest)
  {
    return this.httpClient.delete('http://localhost:8081/admin/leave_requests/' + request.id);
  }

  public updateRequest(request:LeaveRequest, status:string):Observable<HttpResponse<any>>
  {
    return this.httpClient.put<LeaveRequest>('http://localhost:8081/admin/leave_requests/' 
    + request.id + '?status=' + status, null, {observe: 'response'});
  }
}
