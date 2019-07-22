import { Component, OnInit } from '@angular/core';
import { LeaveRequest } from 'src/app/_model/leave-request';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee-leave-view',
  templateUrl: './employee-leave-view.component.html',
  styleUrls: ['./employee-leave-view.component.css']
})
export class EmployeeLeaveViewComponent implements OnInit {
  request:LeaveRequest;

  constructor(public dialogRef: MatDialogRef<EmployeeLeaveViewComponent>) { }

  ngOnInit() {
    this.request =  this.dialogRef.componentInstance.request;
  }

}
