import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TrainingRoom, MeetingRoom } from 'src/app/_model/room';

@Injectable({
  providedIn: 'root'
})
export class AdminRoomService {

  constructor(private httpClient:HttpClient) { }
  public getAllTrainingRooms():Observable<TrainingRoom[]>
  {
    return this.httpClient.get<TrainingRoom[]>('http://localhost:8081/admin/training');
  }
  public getAllMeetingRooms():Observable<MeetingRoom[]>
  {
    return this.httpClient.get<MeetingRoom[]>('http://localhost:8081/admin/meeting');
  }

  public deleteMeetingRoom(room:MeetingRoom)
  {
    return this.httpClient.delete('http://localhost:8081/admin/meeting/' + room.id);
  }

  public deleteTrainingRoom(room:TrainingRoom)
  {
    return this.httpClient.delete('http://localhost:8081/admin/training/' + room.id);
  }

  public addTrainingRoom(room: TrainingRoom):Observable<HttpResponse<TrainingRoom>>
  {
    return this.httpClient.post<TrainingRoom>('http://localhost:8081/admin/training/', room, {observe: 'response'});
  }

  public addMeetingRoom(room: MeetingRoom):Observable<HttpResponse<MeetingRoom>>
  {
    return this.httpClient.post<MeetingRoom>('http://localhost:8081/admin/meeting/', room, {observe: 'response'});
  }
}
