import { Component, OnInit } from '@angular/core';
import { LeaveRequest } from 'src/app/_model/leave-request';
import { AdminLeaveService } from 'src/app/_services/admin-services/admin-leave.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlertService } from 'src/app/_services/alert.service';
import { AdminEditLeaveComponent } from './admin-edit-leave/admin-edit-leave.component';
import { AdminDeleteLeaveComponent } from './admin-delete-leave/admin-delete-leave.component';

@Component({
  selector: 'app-admin-leaves',
  templateUrl: './admin-leaves.component.html',
  styleUrls: ['./admin-leaves.component.css']
})
export class AdminLeavesComponent implements OnInit {
  requests: LeaveRequest[];
  constructor(public dialog: MatDialog,
    private leaveService: AdminLeaveService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getAllRequests();
  }
  //to approve/reject a request
  openViewRequestDialog(request: LeaveRequest) {
    let dialogRef: MatDialogRef<AdminEditLeaveComponent>;
    dialogRef = this.dialog.open(AdminEditLeaveComponent, {
      disableClose: false,
    });
    dialogRef.componentInstance.request = request;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alertService.clear();
        this.leaveService.updateRequest(request, result).subscribe(
          (response) => {
            if (response.ok) {
              this.alertService.success("Request updated successfully!");
            }
            this.getAllRequests();
          },
          error => {
            this.alertService.error("An error has occurred: " + error.status + " " + error.statusText);
          }
        );
      }
      dialogRef = null;
    });
  }

  //to delete a request
  openDeleteRequestDialog(request: LeaveRequest) {
    this.alertService.clear();
    if (request.status=='PENDING')
    {
      this.alertService.error('Approve or reject the request before deleting!');
      return;
    }
    let dialogRef: MatDialogRef<AdminDeleteLeaveComponent>;
    dialogRef = this.dialog.open(AdminDeleteLeaveComponent, {
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.leaveService.deleteRequest(request).subscribe(() =>
          this.requests = this.requests.filter(a => a !== request));
      }
      dialogRef = null;
    });
  }

  getAllRequests() {
    this.leaveService.getAllRequests().subscribe(
      response => {
        this.requests = response;
      }
    );
  }

  getRequestsByStatus(status: string) {
    this.leaveService.getRequestsByStatus(status).subscribe(
      response => {
        this.requests = response;
      }
    );
  }
}
