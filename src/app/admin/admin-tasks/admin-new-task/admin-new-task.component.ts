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
      this.task.startDate = this.dateStructToJSON(this.startDate);
      this.task.dueDate = this.dateStructToJSON(this.dueDate);
      this.dialogRef.close(this.task);
    }
  }

  
  dateStructToJSON(n:NgbDateStruct):string
  {
    var month:string = n.month.toString();
    if(month.length==1) month = '0'+month; 
    
    var day:string = n.day.toString();
    if(day.length==1) day = '0'+day; 
    
    return  n.year+'-'+month+'-'+day+'T12:00:00.000Z';
  }
}
