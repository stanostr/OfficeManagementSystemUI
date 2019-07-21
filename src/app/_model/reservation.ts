import { Room } from './room';
import { Employee } from './employee';

export class Reservation {
    id:number;
    room:Room;
    startTime:string;
    endTime:string;
    employee:Employee;
    status:string;
}