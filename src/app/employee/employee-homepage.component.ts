import { Component, OnInit, HostListener } from '@angular/core';
import { GetEmployeeDetailsService } from '../_services/get-employee-details.service';
import { Employee } from '../_model/employee';
import { WeatherService } from '../_services/weather.service';
import { LocationResponse } from '../_model/location-response';
import { WeatherResponse } from '../_model/weather/weather-response';
import { MatDialog, MatDialogRef } from '@angular/material';
import { WeatherComponent } from '../weather/weather.component';
import { NewsComponent } from '../news/news.component';

@Component({
  selector: 'app-employee-homepage',
  templateUrl: './employee-homepage.component.html',
  styleUrls: ['./employee-homepage.component.css']
})
export class EmployeeHomepageComponent implements OnInit {
  weatherUnit: string;
  currLocation: LocationResponse;
  currWeather: WeatherResponse;
  currTime: Date = new Date(); //to display current date and time on screen 
  showMenu: boolean = false;
  currentUser: Employee;

  constructor(private getEmployeeService: GetEmployeeDetailsService,
    private weatherService: WeatherService, public dialog: MatDialog) {
    setInterval(() => {
      this.currTime = new Date();
    }, 1000);
  }

  toggleCollapse() {
    this.showMenu = !this.showMenu;
  }

  ngOnInit() {
    this.getEmployeeService.getAccount().subscribe(
      response => {
        this.currentUser = response;
        sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
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
        this.weatherService.getWeatherByZip(this.currLocation.zip, sessionStorage.getItem('units')).subscribe(
          result => {
            this.currWeather = result.body;
          }
        )
      }
    );
  }

  openWeather() {
    let dialogRef: MatDialogRef<WeatherComponent>;
    dialogRef = this.dialog.open(WeatherComponent, {
      disableClose: false,
    });
    dialogRef.componentInstance.currWeather = this.currWeather;
    dialogRef.componentInstance.currLocation = this.currLocation;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getWeather();
        this.getWeatherUnits();
      }
      dialogRef = null;
    }
    );
  }

  openNews() {
    let dialogRef: MatDialogRef<NewsComponent>;
    dialogRef = this.dialog.open(NewsComponent, {
      disableClose: false,
    });
  }

  //hide the menu (if its open) on screen resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 768) this.showMenu = false;
  }

}
