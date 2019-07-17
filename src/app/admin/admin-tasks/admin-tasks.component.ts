import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_model/task';
import { AdminTaskService } from 'src/app/_services/admin-task.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AdminNewTaskComponent } from './admin-new-task/admin-new-task.component';
import { AdminDeleteTaskComponent } from './admin-delete-task/admin-delete-task.component';
import { AdminEditTaskComponent } from './admin-edit-task/admin-edit-task.component';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {
  tasks: Task[];
  constructor(public dialog: MatDialog,
    private taskService: AdminTaskService) { }

  openNewTaskDialog(task: Task) {
    let dialogRef: MatDialogRef<AdminNewTaskComponent>;
    dialogRef = this.dialog.open(AdminNewTaskComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.addTask(result).subscribe(
          response => {
            if(response.status==201)
            {
              console.log("added successfully")
              //todo add alerts for user
            }
            else {
              console.log("not added because " + response.status + " " + response.statusText);
            }
          }
        );
      }
      dialogRef = null;
    });
  }

  //to edit a task
  openEditTaskDialog(task: Task) {
    let dialogRef: MatDialogRef<AdminEditTaskComponent>;
    dialogRef = this.dialog.open(AdminEditTaskComponent, {
      disableClose: false,
    });
    dialogRef.componentInstance.task = task;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(result).subscribe(
          response => {
            if(response.status==200)
            {
              console.log("updated successfully")
              //todo add alerts for user
            }
            else {
              console.log("not updated because " + response.status + " " + response.statusText);
            }
          }
        );
      }
      dialogRef = null;
    });
  }

  //to delete a task
  openDeleteTaskDialog(task: Task) {
    let dialogRef: MatDialogRef<AdminDeleteTaskComponent>;
    dialogRef = this.dialog.open(AdminDeleteTaskComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(task).subscribe(() =>
          this.tasks = this.tasks.filter(a => a !== task));
      }
      dialogRef = null;
    });
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      response => {
        this.tasks = response;
      }
    );
  }
}


