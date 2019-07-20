import { Component, OnInit } from '@angular/core';
import { TrainingRoom, MeetingRoom, Room } from 'src/app/_model/room';
import { AdminRoomService } from 'src/app/_services/admin-services/admin-room.service';
import { AlertService } from 'src/app/_services/alert.service';
import { AdminDeleteRoomComponent } from './admin-delete-room/admin-delete-room.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {
  displayTraining:boolean;
  trainingRooms:TrainingRoom[];
  meetingRooms:MeetingRoom[];
  constructor(private roomService:AdminRoomService, 
    private alertService:AlertService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.displayTraining=true;
    this.getTrainingRooms();
  }

  toggleRoomType()
  {
    this.displayTraining = !this.displayTraining;
    if(this.displayTraining) this.getTrainingRooms();
    else this.getMeetingRooms();
  }

  getTrainingRooms()
  {
      this.roomService.getAllTrainingRooms().subscribe(
        result=>{
          this.trainingRooms = result;
        }
      )
  }

  getMeetingRooms()
  {
    this.roomService.getAllMeetingRooms().subscribe(
      result=>{
        this.meetingRooms = result;
      }
    )
  }

  openDeleteTrainingRoomDialog(room:TrainingRoom)
  {
    this.alertService.clear();
    let dialogRef: MatDialogRef<AdminDeleteRoomComponent>;
    dialogRef = this.dialog.open(AdminDeleteRoomComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.clear();
        this.roomService.deleteTrainingRoom(room).subscribe(() =>
          this.trainingRooms = this.trainingRooms.filter(a => a !== room));
          this.alertService.error("Room deleted.");
      }
      dialogRef = null;
    });
  }

  openDeleteMeetingRoomDialog(room:MeetingRoom)
  {
    this.alertService.clear();
    let dialogRef: MatDialogRef<AdminDeleteRoomComponent>;
    dialogRef = this.dialog.open(AdminDeleteRoomComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.clear();
        this.roomService.deleteMeetingRoom(room).subscribe(() =>
          this.meetingRooms = this.meetingRooms.filter(a => a !== room));
          this.alertService.error("Room deleted.");
      }
      dialogRef = null;
    });
  }
}
