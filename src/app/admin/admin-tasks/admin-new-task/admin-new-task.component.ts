import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_model/task';
import { MatDialogRef } from '@angular/material';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AdminEmployeeService } from 'src/app/_services/admin-services/admin-employee.service';
import { Employee } from 'src/app/_model/employee';

@Component({
  selector: 'app-admin-new-task',
  templateUrl: './admin-new-task.component.html',
  styleUrls: ['./admin-new-task.component.css']
})
export class AdminNewTaskComponent implements OnInit {
  employees:Employee[];
  task:Task;
  startDate: NgbDateStruct;
  dueDate: NgbDateStruct;

  constructor(public dialogRef: MatDialogRef<AdminNewTaskComponent>, private employeeService:AdminEmployeeService) { }

  ngOnInit() {
    this.task = new Task();
    this.employeeService.getAllEmployees().subscribe(
      result=>
      {
        this.employees = result;
        this.task.employeeId = this.employees[0].id;
      }
    )
  }

  setEmp(e)
  {
    this.task.employeeId = e.substr(0, e.indexOf(' '));
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
