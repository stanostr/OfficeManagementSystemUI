import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Reservation } from 'src/app/_model/reservation';

@Component({
  selector: 'app-admin-reservation-view',
  templateUrl: './admin-reservation-view.component.html',
  styleUrls: ['./admin-reservation-view.component.css']
})
export class AdminReservationViewComponent implements OnInit {
  reservation: Reservation;
  constructor(public dialogRef: MatDialogRef<AdminReservationViewComponent>) { }

  ngOnInit() {
    this.reservation = Object.assign({}, this.dialogRef.componentInstance.reservation);
  }

  color() {
    if (this.reservation.status == 'PENDING') return 'orange';
    if (this.reservation.status == 'REJECTED') return 'red';
    if (this.reservation.status == 'APPROVED') return 'green';
    return 'black';
  }

  confirmDelete():void  {
    var r = confirm("Confirm reservation deletion?");
    if (r == true) {
      this.dialogRef.close('DELETE');
    } 
  }
  deleteable(): boolean {
    let dateNow: Date = new Date();
    let dateStart: Date = new Date(this.reservation.startTime);
    if (dateStart.valueOf() < dateNow.valueOf())
      return true;
    else if (this.reservation.status == 'PENDING') return false;
    return true;
  }
}
