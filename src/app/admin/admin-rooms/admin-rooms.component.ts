import { Component, OnInit } from '@angular/core';
import { TrainingRoom, MeetingRoom, Room } from 'src/app/_model/room';
import { AdminRoomService } from 'src/app/_services/admin-services/admin-room.service';
import { AlertService } from 'src/app/_services/alert.service';
import { AdminDeleteRoomComponent } from './admin-delete-room/admin-delete-room.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AdminAddMeetingRoomComponent } from './admin-add-meeting-room/admin-add-meeting-room.component';
import { AdminAddTrainingRoomComponent } from './admin-add-training-room/admin-add-training-room.component';

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
    private dialog: MatDialog) { }

  ngOnInit() {
    this.displayTraining=true;
    this.getTrainingRooms();
  }

  toggleRoomType(): void
  {
    this.displayTraining = !this.displayTraining;
    if(this.displayTraining) this.getTrainingRooms();
    else this.getMeetingRooms();
  }

  getTrainingRooms(): void 
  {
      this.roomService.getAllTrainingRooms().subscribe(
        result=>{
          this.trainingRooms = result;
        }
      )
  }

  getMeetingRooms(): void
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

  openNewMeetingDialog()
  {
    this.alertService.clear();
    let dialogRef: MatDialogRef<AdminAddMeetingRoomComponent>;
    dialogRef = this.dialog.open(AdminAddMeetingRoomComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

      if (result) {
        this.alertService.clear();
        this.roomService.addMeetingRoom(result).subscribe(response =>
          {
            this.meetingRooms.push(response.body);
            this.alertService.success("Room added.");
          },
          error=>{
            this.alertService.error("An error occurred: " + error.status)
          });
      }
      dialogRef = null;
    });
  }

  openNewTrainingDialog()
  {
    this.alertService.clear();
    let dialogRef: MatDialogRef<AdminAddTrainingRoomComponent>;
    dialogRef = this.dialog.open(AdminAddTrainingRoomComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.alertService.clear();
        this.roomService.addTrainingRoom(result).subscribe(response =>
          {
            this.trainingRooms.push(response.body);
            this.alertService.success("Room added.");
          },
          error=>{
            this.alertService.error("An error occurred: " + error.status)
          });
      }
      dialogRef = null;
    });
  }
}
