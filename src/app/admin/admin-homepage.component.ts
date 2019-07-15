import { Component, OnInit } from '@angular/core';
import { Admin } from '../_model/admin';
import { GetAdminDetailsService } from '../_services/get-admin-details.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  currentUser: Admin;
  currTime: Date = new Date(); //to display current date and time on screen 
  showMenu: boolean = false;

  toggleCollapse() {
    this.showMenu = !this.showMenu
  }

  constructor(private getAdminService: GetAdminDetailsService) {
    //updates the time at 30 second intervals
    setInterval(() => {
      this.currTime = new Date();
    }, 30);
  }

  ngOnInit() {
    this.getAdminService.getAccount().subscribe(
      response => {
      this.currentUser = response;
        console.log(response.firstName);
      }
    );

  }

}
