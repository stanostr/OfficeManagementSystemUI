import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { EmployeeRoomService } from 'src/app/_services/employee-services/employee-room.service';
import { TrainingRoom, MeetingRoom } from 'src/app/_model/room';
import { ReservationRequest } from 'src/app/_model/reservation-request';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {
  error: boolean;
  errorMessage: string;
  date: NgbDateStruct;
  timeFrom: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  timeTo: NgbTimeStruct = { hour: 0, minute: 0, second: 0 };
  training: boolean;
  reservation: ReservationRequest;
  trainingRooms: TrainingRoom[];
  meetingRooms: MeetingRoom[];
  constructor(public dialogRef: MatDialogRef<NewReservationComponent>, private roomService: EmployeeRoomService) { }

  ngOnInit() {
    this.error = false;
    this.reservation = new ReservationRequest();
    this.training = true;
    this.getTrainingRooms();
    this.getMeetingRooms();
  }

  getMeetingRooms() {
    this.roomService.getAllMeetingRooms().subscribe(
      result => {
        this.meetingRooms = result;
      }
    );
  }
  getTrainingRooms() {
    this.roomService.getAllTrainingRooms().subscribe(
      result => 
      {
        this.trainingRooms = result;
      }
    );
  }
  setRoom(e) {
  
    this.reservation.roomId = e.substr(0, e.indexOf(' '));
  }

  validate() {
    this.error = false;
    if (this.timeTo.hour <= this.timeFrom.hour) {
      this.error = true;
      this.errorMessage = 'Reservation must be at least one hour long!'
    }
    else if (!this.date) {
      this.error = true;
      this.errorMessage = 'Choose a date!'
    }
    else {
      if(this.reservation.roomId==null)
      {
        if(this.training) this.reservation.roomId = this.trainingRooms[0].id;
        else this.reservation.roomId = this.meetingRooms[0].id;
      }

      this.reservation.startTime = this.dateAndTimeToJSON(this.date, this.timeFrom);
      if(this.timeTo.minute > 0 ) this.timeTo.hour = this.timeTo.hour + 1;
      this.reservation.endTime = this.dateAndTimeToJSON(this.date, this.timeTo);
      if (this.training)
        this.roomService.postTrainingReservation(this.reservation).subscribe(
          result => {
            if (result.ok)
              this.dialogRef.close(0);
          },
          error => {
            if (error.status == 400)
              this.dialogRef.close(1);
            else this.dialogRef.close(-1)
          }
        )
        else this.roomService.postMeetingReservation(this.reservation).subscribe(
          result => {
            if (result.ok)
              this.dialogRef.close(0);
          },
          error => {
            if (error.status == 400)
              this.dialogRef.close(1);
            else this.dialogRef.close(-1)
          }
        )
    }
  }

  dateAndTimeToJSON(n: NgbDateStruct, t: NgbTimeStruct): string {
    var month: string = n.month.toString();
    if (month.length == 1) month = '0' + month;

    var day: string = n.day.toString();
    if (day.length == 1) day = '0' + day;

    var hour: string = t.hour.toString();
    if (hour.length == 1) hour = '0' + hour;

    var minute: string = t.minute.toString();
    if (minute.length == 1) minute = '0' + minute;
  
    return n.year + '-' + month + '-' + day + 'T' + hour + ':00:00.000-0400'; 
  }
}
