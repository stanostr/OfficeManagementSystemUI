import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_model/task';
import { MatDialogRef} from '@angular/material';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin-new-task',
  templateUrl: './admin-edit-task.component.html',
  styleUrls: ['./admin-edit-task.component.css']
})
export class AdminEditTaskComponent implements OnInit {
  startDate: NgbDateStruct;
  dueDate: NgbDateStruct;
  task: Task;

  constructor(public dialogRef: MatDialogRef<AdminEditTaskComponent>) { 
  }

  ngOnInit() {
    this.task = this.dialogRef.componentInstance.task;
    console.log(this.task.startDate)
    console.log(this.startDate)
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