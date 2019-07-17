import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_model/task';
import { MatDialogRef } from '@angular/material';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-new-task',
  templateUrl: './admin-new-task.component.html',
  styleUrls: ['./admin-new-task.component.css']
})
export class AdminNewTaskComponent implements OnInit {
  task:Task;
  startDate: NgbDateStruct;
  dueDate: NgbDateStruct;

  constructor(public dialogRef: MatDialogRef<AdminNewTaskComponent>) { }

  ngOnInit() {
    this.task = new Task();
  }

  validate()
  {
    if(this.task.taskName && this.task.employeeId && this.startDate && this.dueDate)
    {
      var startMonth:string = this.startDate.month.toString();
      if(startMonth.length==1) startMonth = '0'+startMonth; 
      
      var startDay:string = this.startDate.day.toString();
      if(startDay.length==1) startDay = '0'+startDay; 
      
      var endMonth:string = this.dueDate.month.toString();
      if(endMonth.length==1) endMonth = '0'+endMonth; 
      
      var endDay:string = this.dueDate.day.toString();
      if(endDay.length==1) endDay = '0'+endDay; 
      this.task.startDate = this.startDate.year+'-'+startMonth+'-'+startDay+'T00:00:00.001Z';
      this.task.dueDate = this.dueDate.year+'-'+endMonth+'-'+endDay+'T00:00:00.001Z';
      this.dialogRef.close(this.task);
    }
  }
}
