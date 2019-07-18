import { Department } from './department';

export class Employee {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    department: Department;
}