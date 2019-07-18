import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_model/task';
import { AdminTaskService } from 'src/app/_services/admin-task.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AdminNewTaskComponent } from './admin-new-task/admin-new-task.component';
import { AdminDeleteTaskComponent } from './admin-delete-task/admin-delete-task.component';
import { AdminEditTaskComponent } from './admin-edit-task/admin-edit-task.component';
import { AlertService } from 'src/app/_services/alert.service';
import { get } from 'http';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {
  tasks: Task[];
  constructor(public dialog: MatDialog,
    private taskService: AdminTaskService,
    private alertService: AlertService) { }

  openNewTaskDialog(task: Task) {
    let dialogRef: MatDialogRef<AdminNewTaskComponent>;
    dialogRef = this.dialog.open(AdminNewTaskComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.addTask(result).subscribe(
          response => {
            if (response.ok) {
              this.tasks.push(response.body);
              this.alertService.clear();
              this.alertService.success("Task added successfully!");
            }
          },
          error => {
            this.alertService.clear();
            if (error.status == 404)
              this.alertService.error("Employee ID not found!")
            else this.alertService.error("An error has occurred: " + error.status + " " + error.statusText);
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
      if (result!=null) {
        this.taskService.updateTask(result).subscribe(
          response => {
            if (response.ok) {
              this.alertService.clear();
              this.alertService.success("Task updated successfully!");
            }
            this.getTasks();
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

  //to delete a task
  openDeleteTaskDialog(task: Task) {
    let dialogRef: MatDialogRef<AdminDeleteTaskComponent>;
    dialogRef = this.dialog.open(AdminDeleteTaskComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.clear();
        this.taskService.deleteTask(task).subscribe(() =>
          this.tasks = this.tasks.filter(a => a !== task));
      }
      dialogRef = null;
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      response => {
        this.tasks = response;
      }
    );
  }

  //possibly for sorting later.
  private compareName(a: Task, b:Task): number
  {
    if(a.taskName>b.taskName) return -1;
    if(b.taskName>a.taskName) return 1;
    else return 0;
  }
}


