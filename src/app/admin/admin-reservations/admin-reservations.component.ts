import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { AdminReservationService } from 'src/app/_services/admin-services/admin-reservation.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Reservation } from 'src/app/_model/reservation';
import { AdminReservationViewComponent } from './admin-reservation-view/admin-reservation-view.component';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})
export class AdminReservationsComponent implements OnInit {
  filterStatus: string;
  reservations: Reservation[];
  constructor(private reservationService: AdminReservationService,
    private alertService: AlertService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getReservations(null);
  }

  viewReservation(reservation: Reservation) {
    let dialogRef: MatDialogRef<AdminReservationViewComponent>;
    dialogRef = this.dialog.open(AdminReservationViewComponent, {
      disableClose: false
    });
    dialogRef.componentInstance.reservation = reservation;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.clear();
        if (result == 'DELETE') {
          this.reservationService.deleteReservation(reservation).subscribe(
            result => {
              if (result.ok) {
                this.getReservations(null);
                this.alertService.warn("Reservation deleted.");
              }
            },
            error => {
              this.alertService.error("An error has occurred: " + error.status + " " + error.statusText);
            }
          );
        }
        else {
          if (result == 'APPROVED') reservation.status = 'APPROVED';
          else if (result == 'REJECTED') reservation.status = 'REJECTED';
          else if (result == 'OTHER') reservation.status = 'OTHER';
          else return;
          this.reservationService.updateReservation(reservation).subscribe(
            response => {
              if (response.ok) {
                this.getReservations(null);
                this.alertService.success("Reservation updated successfully!");
              }
            },
            error => {
              this.alertService.error("An error has occurred: " + error.status + " " + error.statusText);
            }
          );
        }
      }

      dialogRef = null;
    });
  }

  approveAll() {
    this.alertService.clear();
    this.reservations.forEach(reservation => {
      if (reservation.status == 'PENDING') {
        console.log(reservation)
        reservation.status = 'APPROVED';
        this.reservationService.updateReservation(reservation).subscribe(() => { });
      }
    });
    this.alertService.success("All pending reservations approved!")
  }

  getReservations(status: string): void {
    this.alertService.clear();
    this.reservationService.getAllReservations().subscribe(
      result => {
        this.reservations = result;
        if (status == 'PENDING') {
          this.reservations = this.reservations.filter(a => a.status == 'PENDING');
          this.filterStatus = 'PENDING';
        }
        else if (status == 'REJECTED') {
          this.reservations = this.reservations.filter(a => a.status == 'REJECTED');
          this.filterStatus = 'REJECTED';

        }
        else if (status == 'APPROVED') {
          this.reservations = this.reservations.filter(a => a.status == 'APPROVED');
          this.filterStatus = 'APPROVED';
        }
        else this.filterStatus = 'ALL';
      }
    );
  }

  color(reservation: Reservation) {
    if (reservation.status == 'PENDING') return 'orange';
    if (reservation.status == 'REJECTED') return 'red';
    if (reservation.status == 'APPROVED') return 'green';
    return 'black';
  }
}
