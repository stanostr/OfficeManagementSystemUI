import { Component, OnInit, HostListener } from '@angular/core';
import { Admin } from '../_model/admin';
import { GetAdminDetailsService } from '../_services/admin-services/get-admin-details.service';
import { Router } from '@angular/router';
import { WeatherService } from '../_services/weather.service';
import { WeatherResponse } from '../_model/weather/weather-response';
import { LocationResponse } from '../_model/location-response';
import { MatDialog, MatDialogRef } from '@angular/material';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  weatherUnit:string;
  currLocation: LocationResponse;
  currWeather: WeatherResponse;
  currentUser: Admin;
  currTime: Date = new Date(); //to display current date and time on screen 
  showMenu: boolean = false;

  toggleCollapse() {
    this.showMenu = !this.showMenu;
  }

  constructor(private getAdminService: GetAdminDetailsService,
    private weatherService: WeatherService,
    private router: Router,
    public dialog: MatDialog) {
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
      this.getWeatherUnits();
    this.getWeather();
   
  }

  private getWeatherUnits() {
    if (sessionStorage.getItem('units') == 'imperial')
      this.weatherUnit = 'F';
    else if (sessionStorage.getItem('units') == 'metric')
      this.weatherUnit = 'C';
    else
      this.weatherUnit = 'K';
  }

  getWeather() {
    this.weatherService.getLocation().subscribe(
      result => {
        this.currLocation = result.body;
        console.log('Zip: ' + this.currLocation.zip);
        this.weatherService.getWeatherByZip(this.currLocation.zip, sessionStorage.getItem('units')).subscribe(
          result => {
            this.currWeather = result.body;
          }
        )
      }
    );
  }

  navigateToLogin() {
    this.router.navigateByUrl('/logout');
  }
  //hide the menu (if its open) on screen resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 768) this.showMenu = false;
  }

  openWeather() {
    let dialogRef: MatDialogRef<WeatherComponent>;
    dialogRef = this.dialog.open(WeatherComponent, {
      disableClose: false,
    });
    dialogRef.componentInstance.currWeather = this.currWeather;
    dialogRef.componentInstance.currLocation = this.currLocation;
    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.getWeather();
        this.getWeatherUnits();
      }
      dialogRef = null;
    });
  }

}