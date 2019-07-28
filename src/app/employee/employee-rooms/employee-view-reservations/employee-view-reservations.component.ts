import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeRoomService } from 'src/app/_services/employee-services/employee-room.service';
import { Reservation } from 'src/app/_model/reservation';
import { MessageService } from 'src/app/_services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-view-reservations',
  templateUrl: './employee-view-reservations.component.html',
  styleUrls: ['./employee-view-reservations.component.css']
})
export class EmployeeViewReservationsComponent implements OnInit, OnDestroy {
  reservations:Reservation[]
  subscription:Subscription;
  constructor(private roomService:EmployeeRoomService, private messageService:MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.getReservations();
      }});
   }

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
