import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_model/task';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee-task-view',
  templateUrl: './employee-task-view.component.html',
  styleUrls: ['./employee-task-view.component.css']
})
export class EmployeeTaskViewComponent implements OnInit {
  task: Task;

  constructor(public dialogRef: MatDialogRef<EmployeeTaskViewComponent>) { }

  ngOnInit() {
    this.task = Object.assign({}, this.dialogRef.componentInstance.task);
  }

  complete() {
    if (confirm("Mark task complete?"))
      this.dialogRef.close(true);
  }
}
