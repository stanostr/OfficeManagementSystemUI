import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-admin-delete-leave',
  templateUrl: './admin-delete-leave.component.html',
  styleUrls: ['./admin-delete-leave.component.css']
})
export class AdminDeleteLeaveComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminDeleteLeaveComponent>) { }

  ngOnInit() {
  }

}
