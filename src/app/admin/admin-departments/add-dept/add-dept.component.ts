import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Dept } from 'src/app/_model/department';

@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.css']
})
export class AddDeptComponent implements OnInit {
  departmentName: string;

  constructor(public dialogRef: MatDialogRef<AddDeptComponent>) { }

  ngOnInit() {
    
  }

  validate()
  {
    if(this.departmentName==null || this.departmentName.length == 0)
    this.dialogRef.close(this.departmentName);
  }

}
