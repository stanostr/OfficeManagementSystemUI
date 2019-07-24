import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-rooms',
  templateUrl: './employee-rooms.component.html',
  styleUrls: ['./employee-rooms.component.css']
})
export class EmployeeRoomsComponent implements OnInit {

  constructor(private router:Router, private alertService:AlertService,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  newReservation()
  {
    const CANCELED = -2;
    const ERROR = -1;
    const TAKEN = 1;
    const GOOD = 0;
    this.alertService.clear();
    let dialogRef: MatDialogRef<NewReservationComponent>;
    dialogRef = this.dialog.open(NewReservationComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==GOOD) {
        this.alertService.success("Reservation request sent.");
      }
      else if(result==TAKEN) {
        this.alertService.warn("Sorry, this time slot is unavailable for this room!")
      } 
      else if (result == null || result==CANCELED) {
      }
      else this.alertService.error("An error has occurred, please contact administrator.")
      dialogRef = null;
    });
  }
}
