import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/_model/reservation';

@Injectable({
  providedIn: 'root'
})
export class AdminReservationService {

  constructor(private httpClient:HttpClient) { }
  
  getAllReservations():Observable<Reservation[]>
  {
    return this.httpClient.get<Reservation[]>('http://localhost:8081/admin/reservations');
  }

  deleteReservation(reservation:Reservation)
  {
    this.httpClient.delete('http://localhost:8081/admin/reservations/' + reservation.id);
  }

  deleteAllRejected()
  {
    this.httpClient.delete('http://localhost:8081/admin/reservations/rejected');
  }

  updateReservation(reservation:Reservation)
  {
    return this.httpClient.put('http://localhost:8081/admin/reservations/' + reservation.id + "?status" + reservation.status, reservation);
  }
}
