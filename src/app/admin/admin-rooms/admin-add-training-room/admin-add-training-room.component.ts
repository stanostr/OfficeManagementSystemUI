import { Component, OnInit } from '@angular/core';
import { TrainingRoom } from 'src/app/_model/room';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-admin-add-training-room',
  templateUrl: './admin-add-training-room.component.html',
  styleUrls: ['./admin-add-training-room.component.css']
})
export class AdminAddTrainingRoomComponent implements OnInit {
  room: TrainingRoom;
  constructor(public dialogRef: MatDialogRef<AdminAddTrainingRoomComponent>) { }

  ngOnInit() {
    this.room = new TrainingRoom();
  }

}
