import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeetingRoom, TrainingRoom } from 'src/app/_model/room';
import { EmployeeRoomService } from 'src/app/_services/employee-services/employee-room.service';
import { MessageService } from 'src/app/_services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-view-rooms',
  templateUrl: './employee-view-rooms.component.html',
  styleUrls: ['./employee-view-rooms.component.css']
})
export class EmployeeViewRoomsComponent implements OnInit{
  showTrainingRooms:boolean;
  showMeetingRooms:boolean;
  meetingRooms:MeetingRoom[];
  trainingRooms:TrainingRoom[];
  subscription: Subscription;

  constructor(private roomService:EmployeeRoomService) { }

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
