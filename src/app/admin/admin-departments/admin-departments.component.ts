import { Component, OnInit } from '@angular/core';
import { Dept } from 'src/app/_model/department';
import { MatDialog } from '@angular/material';
import { AdminDeptService } from 'src/app/_services/admin-dept.service';
import { AlertService } from 'src/app/_services/alert.service';

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
    if(this.editMode)
      {
        this.deptService.updateDepartment(this.selected).subscribe(result=>{
          if(result && dept==this.selected)
          {
            //this.alertService.info("Department name updated.")
          }
        });
      }
    this.alertService.clear();
    if (dept == this.selected) {
      this.editMode = !this.editMode;
    }
    else this.editMode = true;
    this.selected = dept;
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
