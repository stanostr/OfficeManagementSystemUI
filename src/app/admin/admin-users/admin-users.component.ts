import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_model/employee';
import { MatDialog } from '@angular/material';
import { AdminEmployeeService } from 'src/app/_services/admin-employee.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  employees:Employee[];
  constructor(public dialog: MatDialog,
    private employeeService: AdminEmployeeService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe(
      response => {
        this.employees = response;
        this.employees.forEach(employee => console.log(employee.dept.departmentName))

      }
    )
  }

}
