import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { MeetingRoom, TrainingRoom } from 'src/app/_model/room';
import { EmployeeRoomService } from 'src/app/_services/employee-services/employee-room.service';

@Component({
  selector: 'app-employee-view-rooms',
  templateUrl: './employee-view-rooms.component.html',
  styleUrls: ['./employee-view-rooms.component.css']
})
export class EmployeeViewRoomsComponent implements OnInit {

  showTrainingRooms:boolean;
  showMeetingRooms:boolean;
  meetingRooms:MeetingRoom[];
  trainingRooms:TrainingRoom[];
  constructor(private roomService:EmployeeRoomService, 
    private alertService:AlertService) { }

  ngOnInit() {
    this.showMeetingRooms = true;
    this.showTrainingRooms = true;
    this.getMeetingRooms();
    this.getTrainingRooms();
  }

  getMeetingRooms(): void
  {
    this.roomService.getAllMeetingRooms().subscribe(
      result=>{
        this.meetingRooms = result;
      }
    )
  }

  getTrainingRooms(): void
  {
    this.roomService.getAllTrainingRooms().subscribe(
      result=>{
        this.trainingRooms = result;
      }
    )
  }

}
