import { Component, OnInit, HostListener } from '@angular/core';
import { Admin } from '../_model/admin';
import { GetAdminDetailsService } from '../_services/admin-services/get-admin-details.service';
import { Router } from '@angular/router';

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
    this.showMenu = !this.showMenu;
  }

  constructor(private getAdminService: GetAdminDetailsService,
    private router: Router) {
    //updates the time at 30 second intervals
    setInterval(() => {
      this.currTime = new Date();
    }, 30);
  }

  ngOnInit() {
    this.getAdminService.getAccount().subscribe(
      response => {
        this.currentUser = response;
        sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      },
      error => {  
        //either the token expired, or the backend is not accessible, so logout
        this.navigateToLogin();
      });
  }

  navigateToLogin() {
    this.router.navigateByUrl('/logout');
  }
  //hide the menu (if its open) on screen resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 768) this.showMenu = false;
  }

}