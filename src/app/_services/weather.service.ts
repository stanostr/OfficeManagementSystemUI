import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationResponse } from '../_model/location-response';
import { WeatherResponse } from '../_model/weather/weather-response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private static readonly LOCATION_URL = 'http://api.ipstack.com/check?access_key=';
  private static readonly WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?';
  private static readonly WEATHER_API_KEY = '47ac824c16b2d97d53f881acc42eaa9a';
  private static readonly LOCATION_API_KEY ='b92df18f873a5b3ee21e7d07776fc7cd';

  constructor(public httpClient:HttpClient) { 
  }

  getLocation():Observable<HttpResponse<LocationResponse>>
  {
    return this.httpClient.get<LocationResponse>(WeatherService.LOCATION_URL +WeatherService.LOCATION_API_KEY, {observe: 'response'});
  }

  getWeatherByZip(zip:string, units:string):Observable<HttpResponse<WeatherResponse>>
  {
    return this.httpClient.get<WeatherResponse>(WeatherService.WEATHER_URL +'zip=' + zip + '&appid=' + WeatherService.WEATHER_API_KEY+'&units='+units, {observe: 'response'});
  }

}
