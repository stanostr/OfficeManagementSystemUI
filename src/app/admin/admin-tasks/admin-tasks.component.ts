import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/_model/task';
import { AdminTaskService } from 'src/app/_services/admin-task.service';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {
  tasks:Task[];
  constructor(private taskService: AdminTaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      response => {
        this.tasks = response;
      }
    );
  }
}
