export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherProvider {
  searchLocations(query: string): Promise<Location[]>;
}
