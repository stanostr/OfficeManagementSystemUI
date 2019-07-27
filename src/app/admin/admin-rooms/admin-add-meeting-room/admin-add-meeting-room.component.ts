import { Component, OnInit } from '@angular/core';
import { MeetingRoom } from 'src/app/_model/room';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-admin-add-meeting-room',
  templateUrl: './admin-add-meeting-room.component.html',
  styleUrls: ['./admin-add-meeting-room.component.css']
})
export class AdminAddMeetingRoomComponent implements OnInit {
  room: MeetingRoom;
  constructor(public dialogRef: MatDialogRef<AdminAddMeetingRoomComponent>) { }

  ngOnInit() {
    this.room = new MeetingRoom();
  }

  validate(room:MeetingRoom)
  {
      if(room.name == null || room.name.length == 0 || room.capacity == null)
        return;
      else this.dialogRef.close(room);
  }

}
