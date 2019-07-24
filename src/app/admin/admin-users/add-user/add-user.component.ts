import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Employee } from 'src/app/_model/employee';
import { AdminDeptService } from 'src/app/_services/admin-services/admin-dept.service';
import { Dept } from 'src/app/_model/department';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  error:boolean;
  errorMessage: string;
  employee:Employee;
  confirmPassword:string;
  department: Dept;
  departments:Dept[];

  constructor(private deptService:AdminDeptService,
    public dialogRef: MatDialogRef<AddUserComponent>) { 
    this.employee = new Employee();
  }

  validate()
  {
    this.error=false;
    if(this.employee.firstName && this.employee.lastName && 
      this.employee.email && this.employee.password && this.confirmPassword == this.employee.password)
    {
      if(this.department) 
      {
        this.employee.dept = this.department;
      }
      this.dialogRef.close(this.employee);
    }
    if( this.confirmPassword != this.employee.password)
    {
        this.error = true;
        this.errorMessage = "Passwords do not match!"
    }
  }

  setDept(e)
  {
    this.department = this.departments.filter((department) => department.departmentName == e)[0];
  }

  ngOnInit() {
    this.deptService.getAllDepartments().subscribe(
      result=>
      {
        this.departments = result;
        this.department = this.departments[0];
      } 
    );
  }

}
