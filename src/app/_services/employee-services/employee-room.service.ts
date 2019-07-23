import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingRoom, MeetingRoom } from 'src/app/_model/room';
import { Reservation } from 'src/app/_model/reservation';
import { ReservationRequest } from 'src/app/_model/reservation-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRoomService {

  constructor(private httpClient: HttpClient) { }

  public getAllTrainingRooms(): Observable<TrainingRoom[]> {
    return this.httpClient.get<TrainingRoom[]>('http://localhost:8081/employee/training');
  }

  public getAllMeetingRooms(): Observable<MeetingRoom[]> {
    return this.httpClient.get<MeetingRoom[]>('http://localhost:8081/employee/meeting');
  }

  public getMyReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>('http://localhost:8081/employee/reservations');
  }

  public postTrainingReservation(request: ReservationRequest): Observable<HttpResponse<ReservationRequest>> {
    return this.httpClient.post<ReservationRequest>('http://localhost:8081/employee/training/reserve', request, {observe: 'response'});
  }
  
  public postMeetingReservation(request: ReservationRequest): Observable<HttpResponse<ReservationRequest>> {
    return this.httpClient.post<ReservationRequest>('http://localhost:8081/employee/meeting/reserve', request, {observe: 'response'});
  }
}
