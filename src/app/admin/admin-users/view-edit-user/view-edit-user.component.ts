import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AdminDeptService } from 'src/app/_services/admin-dept.service';
import { Employee } from 'src/app/_model/employee';
import { Dept } from 'src/app/_model/department';

@Component({
  selector: 'app-view-edit-user',
  templateUrl: './view-edit-user.component.html',
  styleUrls: ['./view-edit-user.component.css']
})
export class ViewEditUserComponent implements OnInit {
  error: boolean;
  confirmPassword: string;
  errorMessage: string;
  editMode: boolean;
  employee: Employee;
  departments: Dept[];
  department: Dept;
  constructor(private deptService: AdminDeptService,
    public dialogRef: MatDialogRef<ViewEditUserComponent>) {
  }

  ngOnInit() {
    this.deptService.getAllDepartments().subscribe(
      result => this.departments = result
    );
    this.editMode = this.dialogRef.componentInstance.editMode;
    this.employee = Object.assign({}, this.dialogRef.componentInstance.employee);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  closeEditMode() {
    this.toggleEditMode();
    this.employee = Object.assign({}, this.dialogRef.componentInstance.employee);
  }

  setDept(e) {
    this.department = this.departments.filter((department) => department.departmentName == e)[0];
  }

  validate() {
    this.error = false;
    if (this.employee.firstName && this.employee.lastName &&
      this.employee.email && this.employee.password && this.confirmPassword == this.employee.password) {
      if (this.department) {
        this.employee.dept = this.department;
      }
      this.dialogRef.close(this.employee);
    }
    if (this.confirmPassword != this.employee.password) {
      this.error = true;
      this.errorMessage = "Passwords do not match!"
    }
  }
}
