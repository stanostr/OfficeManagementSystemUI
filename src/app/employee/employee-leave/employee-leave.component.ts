import { Component, OnInit } from '@angular/core';
import { EmployeeLeaveService } from 'src/app/_services/employee-services/employee-leave.service';
import { LeaveRequest } from 'src/app/_model/leave-request';
import { AlertService } from 'src/app/_services/alert.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {
  newRequest: LeaveRequest;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;

  requests: LeaveRequest[];
  showList: boolean;
  constructor(private leaveService: EmployeeLeaveService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.showList = false;
    this.newRequest = new LeaveRequest();
    this.getMyLeaveRequests();
  }

  getMyLeaveRequests() {
    this.leaveService.getMyRequests().subscribe(
      result => {
        this.requests = result;
      }
    )
  }

  color(request: LeaveRequest) {
    if (request.status == 'PENDING') return 'orange';
    if (request.status == 'REJECTED') return 'red';
    if (request.status == 'APPROVED') return 'green';
    return 'black';
  }

  openViewRequestDialog(request:LeaveRequest)
  {

  }

  deleteLeaveRequest(request: LeaveRequest) {
    if (confirm("Delete this leave request?")) {
      this.alertService.clear();
      this.leaveService.deleteRequest(request).subscribe(
        result => {
          if (result.ok) {
            this.requests = this.requests.filter(a => !(a == request));
            this.alertService.success("Leave request deleted");
          }
        },
        error => {
          this.alertService.error("An error occurred: " + error.status + ". Please contact administrator.");
        }
      )
    }
  }

  setType(e) {
    this.newRequest.type = e + "_LEAVE";
  }

  dateStructToJSON(n: NgbDateStruct): string {
    var month: string = n.month.toString();
    if (month.length == 1) month = '0' + month;

    var day: string = n.day.toString();
    if (day.length == 1) day = '0' + day;

    return n.year + '-' + month + '-' + day + 'T12:00:00.000Z';
  }

  resetForm() {
    this.newRequest = new LeaveRequest();
  }

  validate() {
    this.alertService.clear();
    if (this.newRequest.reason && this.startDate && this.endDate) {
      this.newRequest.startDate = this.dateStructToJSON(this.startDate);
      this.newRequest.endDate = this.dateStructToJSON(this.endDate);
      this.leaveService.postRequest(this.newRequest).subscribe(
        response => {
          if (response.ok) {
            this.alertService.success("Leave request posted successfully.")
            this.getMyLeaveRequests();
            this.newRequest = new LeaveRequest();
          }
        },
        error => {
          this.alertService.error("An error occurred: " + error.status + ". Please contact administrator.")
        }
      )
    }
    else {
      this.alertService.error("Please fill out all the fields.")
    }
  }
}
