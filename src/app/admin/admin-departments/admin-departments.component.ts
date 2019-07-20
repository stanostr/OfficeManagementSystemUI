import { Component, OnInit } from '@angular/core';
import { Dept } from 'src/app/_model/department';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AdminDeptService } from 'src/app/_services/admin-services/admin-dept.service';
import { AlertService } from 'src/app/_services/alert.service';
import { DeleteDeptComponent } from './delete-dept/delete-dept.component';
import { AddDeptComponent } from './add-dept/add-dept.component';

@Component({
  selector: 'app-admin-departments',
  templateUrl: './admin-departments.component.html',
  styleUrls: ['./admin-departments.component.css']
})
export class AdminDepartmentsComponent implements OnInit {
  departments: Dept[];
  editMode: boolean;
  selected: Dept;
  constructor(public dialog: MatDialog,
    private deptService: AdminDeptService,
    private alertService: AlertService) { }

  toggleEditMode(dept: Dept) {
    this.alertService.clear();
    if(this.editMode)
      {
        this.deptService.updateDepartment(this.selected).subscribe(result=>{
          if(result && dept==this.selected)
          {
            //this.alertService.info("Department name updated.")
          }
        });
      }
    if (dept == this.selected) {
      this.editMode = !this.editMode;
    }
    else this.editMode = true;
    this.selected = dept;
  }

  //to delete a department
  openDeleteDepartmentDialog(dept: Dept) {
    this.alertService.clear();
    let dialogRef: MatDialogRef<DeleteDeptComponent>;
    dialogRef = this.dialog.open(DeleteDeptComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.clear();
        this.deptService.deleteDepartment(dept).subscribe(() =>
          this.departments = this.departments.filter(a => a !== dept));
          this.alertService.error("Department deleted.");
      }
      dialogRef = null;
    });
  }

  openNewDepartmentDialog() {
    let dialogRef: MatDialogRef<AddDeptComponent>;
    dialogRef = this.dialog.open(AddDeptComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let newDept: Dept = new Dept();
        newDept.departmentName = result;
        this.deptService.addDepartment(newDept).subscribe(
          response => {
            if (response.status == 201) {
              this.departments.push(response.body);
              this.alertService.clear();
              this.alertService.success("Department added successfully!");
            }
          },
          error => {
            this.alertService.clear();
            if(error.status ==500){
              this.alertService.error("Error: Does this department already exist?");
            }
            else this.alertService.error("An error has occurred: " + error.status + " " + error.statusText);
          }
        );
      }
      dialogRef = null;
    });
  }


  ngOnInit() {
    this.getDepartments();
    this.editMode = false;
  }

  private getDepartments() {
    this.deptService.getAllDepartments().subscribe(
      response => {
        this.departments = response;
      }
    );
  }
}
