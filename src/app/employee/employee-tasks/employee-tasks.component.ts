import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertService } from 'src/app/_services/alert.service';
import { EmployeeTaskService } from 'src/app/_services/employee-services/employee-task.service';
import { Task } from 'src/app/_model/task';
import { EmployeeTaskViewComponent } from './employee-task-view/employee-task-view.component';

@Component({
  selector: 'app-employee-tasks',
  templateUrl: './employee-tasks.component.html',
  styleUrls: ['./employee-tasks.component.css']
})
export class EmployeeTasksComponent implements OnInit {
  tasks: Task[];
  constructor(public dialog: MatDialog,
    private taskService: EmployeeTaskService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getMyTasks().subscribe(
      result => {
        this.tasks = result;
      }
    )
  }

  getCompletedTasks() {
    this.taskService.getMyTasks().subscribe(
      result => {
        this.tasks = result.filter(a => a.completed);
      }
    )
  }

  getIncompleteTasks() {
    this.taskService.getMyTasks().subscribe(
      result => {
        this.tasks = result.filter(a => !a.completed);
      }
    )
  }

  viewTask(task: Task) {
    let dialogRef: MatDialogRef<EmployeeTaskViewComponent>;
    dialogRef = this.dialog.open(EmployeeTaskViewComponent, {
      disableClose: false,
    });
    dialogRef.componentInstance.task = task;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.completeTask(task);
      }
      dialogRef = null;
    });
  }

  completeTaskFromList(task: Task) {
    if (confirm('Mark task as complete?')) this.completeTask(task);
  }
  completeTask(task: Task) {
    this.alertService.clear();
    task.completed = true;
    this.taskService.updateTask(task).subscribe(
      () => {
        this.alertService.success("Task marked completed and admin has been notified.");
        this.getTasks();
      },
      error => {
        this.alertService.error("An error has occurred: " + error.status + ". Please contact administrator.")
      }
    )
  }

}
