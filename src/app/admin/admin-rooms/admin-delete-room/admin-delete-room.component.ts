import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-admin-delete-room',
  templateUrl: './admin-delete-room.component.html',
  styleUrls: ['./admin-delete-room.component.css']
})
export class AdminDeleteRoomComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminDeleteRoomComponent>) { }

  ngOnInit() {
  }

}
