import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-admin-delete-task',
  templateUrl: './admin-delete-task.component.html',
  styleUrls: ['./admin-delete-task.component.css']
})
export class AdminDeleteTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminDeleteTaskComponent>) { }

  ngOnInit() {
  }

}
