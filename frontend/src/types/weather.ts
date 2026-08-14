export interface Weather {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    weatherCode: number;
  };

  daily: {
    date: string;
    maxTemperature: number;
    minTemperature: number;
    weatherCode: number;
  }[];
}
