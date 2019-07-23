import { Component, OnInit } from '@angular/core';
import { EmployeeRoomService } from 'src/app/_services/employee-services/employee-room.service';
import { Reservation } from 'src/app/_model/reservation';

@Component({
  selector: 'app-employee-view-reservations',
  templateUrl: './employee-view-reservations.component.html',
  styleUrls: ['./employee-view-reservations.component.css']
})
export class EmployeeViewReservationsComponent implements OnInit {
  reservations:Reservation[]
  constructor(private roomService:EmployeeRoomService) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.roomService.getMyReservations().subscribe(
      result => this.reservations = result
    );
  }

  color(reservation: Reservation) {
    if (reservation.status == 'PENDING') return 'orange';
    if (reservation.status == 'REJECTED') return 'red';
    if (reservation.status == 'APPROVED') return 'green';
    return 'black';
  }

}
