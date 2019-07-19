import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dept',
  templateUrl: './delete-dept.component.html',
  styleUrls: ['./delete-dept.component.css']
})
export class DeleteDeptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDeptComponent>) { }

  ngOnInit() {
  }

}
