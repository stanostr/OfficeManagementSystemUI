
export class WeatherResponse
{
  coord:Coord;
  weather: Weather[]; 
  main: Main;
}

export class Coord {
  lon: number;
  lat: number;
}

export class Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export class Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}