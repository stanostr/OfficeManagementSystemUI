import { Employee } from './employee';

export class LeaveRequest {
    id:number;
    employee:Employee;
    startDate:string;
    endDate:string;
    reason:string;
    status:string;
    type:string;
}