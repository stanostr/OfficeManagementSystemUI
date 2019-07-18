import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/_model/employee';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AdminEmployeeService } from 'src/app/_services/admin-employee.service';
import { AlertService } from 'src/app/_services/alert.service';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewEditUserComponent } from './view-edit-user/view-edit-user.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  employees: Employee[];
  constructor(public dialog: MatDialog,
    private employeeService: AdminEmployeeService,
    private alertService: AlertService) {
  }
  //to delete an employee
  openDeleteEmployeeDialog(employee: Employee) {
    let dialogRef: MatDialogRef<DeleteUserComponent>;
    dialogRef = this.dialog.open(DeleteUserComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.clear();
        this.employeeService.deleteEmployee(employee).subscribe(() =>
          this.employees = this.employees.filter(a => a !== employee));
      }
      dialogRef = null;
    });
  }
  openNewEmployeeDialog() {
    let dialogRef: MatDialogRef<AddUserComponent>;
    dialogRef = this.dialog.open(AddUserComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.employeeService.addUser(result).subscribe(
          response => {
            if (response.status == 201) {
              this.employees.push(response.body);
              this.alertService.clear();
              this.alertService.success("User added successfully!");
            }
          },
          error => {
            this.alertService.clear();
            if (error.status == 400) {
              this.alertService.error("Employee with this e-mail already exists! Employee not created.")
            }
            else this.alertService.error("An error has occurred: " + error.status + " " + error.statusText);
          }
        );
      }
      dialogRef = null;
    });
  }

  openEditEmployeeDialog(employee: Employee) {
    let dialogRef: MatDialogRef<ViewEditUserComponent>;
    dialogRef = this.dialog.open(ViewEditUserComponent, {
      disableClose: false
    });
    
    dialogRef.componentInstance.employee = employee;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(result).subscribe(
          response => {
            if (response.ok) {
              this.alertService.clear();
              this.alertService.success("Employee updated successfully!");
            }
            this.getEmployees();
          },
          error => {
            this.alertService.clear();
            this.alertService.error("An error has occurred: " + error.status + " " + error.statusText);
          }
        );
      }

      dialogRef = null;
    });
  }

  ngOnInit() {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      response => {
        this.employees = response;
      }
    );
  }

}
