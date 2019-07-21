import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { AdminReservationService } from 'src/app/_services/admin-services/admin-reservation.service';
import { MatDialog } from '@angular/material';
import { Reservation } from 'src/app/_model/reservation';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})
export class AdminReservationsComponent implements OnInit {
  reservations:Reservation[];
  constructor(private reservationService:AdminReservationService, 
    private alertService:AlertService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getReservations();
  }

  
  getReservations(): void
  {
    this.reservationService.getAllReservations().subscribe(
      result=>{
        this.reservations = result;
        console.log(this.reservations)

      }
    );
  }
}
