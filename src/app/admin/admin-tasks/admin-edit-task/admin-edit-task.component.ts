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
    this.task = Object.assign({}, this.dialogRef.componentInstance.task);
    this.startDate = this.JSONtoDateStruct(this.task.startDate);
    this.dueDate = this.JSONtoDateStruct(this.task.dueDate);
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

  JSONtoDateStruct(json:string): NgbDateStruct
  {
     let year:string = json.substr(0, 4);
     let month:string = json.substr(5, 2);
     let day:string = json.substr(8, 2);
     return {year:+year, month:+month, day:+day}
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