import { Component, OnInit } from '@angular/core';
import { TrainingRoom, MeetingRoom } from 'src/app/_model/room';
import { AdminRoomService } from 'src/app/_services/admin-services/admin-room.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent implements OnInit {
  displayTraining:boolean;
  trainingRooms:TrainingRoom[];
  meetingRooms:MeetingRoom[];
  constructor(private roomService:AdminRoomService, private alertService:AlertService) { }

  ngOnInit() {
    this.displayTraining=true;
    this.getTrainingRooms();
  }

  toggleRoomType()
  {
    this.displayTraining = !this.displayTraining;
    if(this.displayTraining) this.getTrainingRooms();
    else this.getMeetingRooms();
  }

  getTrainingRooms()
  {
      this.roomService.getAllTrainingRooms().subscribe(
        result=>{
          console.log(result)

          this.trainingRooms = result;
        }
      )
  }

  getMeetingRooms()
  {
    this.roomService.getAllMeetingRooms().subscribe(
      result=>{
        console.log(result)
        this.meetingRooms = result;
      }
    )
  }
}
