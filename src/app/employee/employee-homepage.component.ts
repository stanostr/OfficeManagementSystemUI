import { Component, OnInit, HostListener } from '@angular/core';
import { GetEmployeeDetailsService } from '../_services/get-employee-details.service';
import { Employee } from '../_model/employee';

@Component({
  selector: 'app-employee-homepage',
  templateUrl: './employee-homepage.component.html',
  styleUrls: ['./employee-homepage.component.css']
})
export class EmployeeHomepageComponent implements OnInit {
  currTime: Date = new Date(); //to display current date and time on screen 
  showMenu: boolean = false;
  currentUser: Employee;

  toggleCollapse() {
    this.showMenu = !this.showMenu
  }
  constructor(private getEmployeeService: GetEmployeeDetailsService) { 
      //updates the time at 30 second intervals
      setInterval(() => {
        this.currTime = new Date();
      }, 30);
  }

  ngOnInit() {
    this.getEmployeeService.getAccount().subscribe(
      response => {
      this.currentUser = response;
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
    );
  }

  
  //hide the menu (if its open) on screen resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth<768) this.showMenu = false;
  }

}
