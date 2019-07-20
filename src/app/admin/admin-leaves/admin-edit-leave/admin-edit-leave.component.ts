import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LeaveRequest } from 'src/app/_model/leave-request';

@Component({
  selector: 'app-admin-edit-leave',
  templateUrl: './admin-edit-leave.component.html',
  styleUrls: ['./admin-edit-leave.component.css']
})
export class AdminEditLeaveComponent implements OnInit {
  request:LeaveRequest;

  constructor(public dialogRef: MatDialogRef<AdminEditLeaveComponent>) { }

  ngOnInit() {
    this.request =  this.dialogRef.componentInstance.request;
  }

}
