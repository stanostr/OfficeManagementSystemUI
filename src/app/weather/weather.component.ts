import { Component, OnInit } from '@angular/core';
import { WeatherResponse } from '../_model/weather/weather-response';
import { LocationResponse } from '../_model/location-response';
import { MatDialogRef } from '@angular/material';
import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherUnit:string;
  currWeather: WeatherResponse;
  currLocation: LocationResponse;
  metric:boolean;
  units:string;

  constructor(public dialogRef: MatDialogRef<WeatherComponent>, private weatherService:WeatherService) { }

  ngOnInit() {
    this.units = sessionStorage.getItem('units');
    if(this.units=='metric') this.metric = true;
    else this.metric = false;
  }

  save()
  {
    if(this.metric)
      sessionStorage.setItem('units', 'metric')
    else
      sessionStorage.setItem('units', 'imperial');
    this.dialogRef.close(true);
  }

}
