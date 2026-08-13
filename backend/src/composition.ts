import { OpenMeteoProvider } from "./providers/open-meteo.provider";
import { WeatherService } from "./services/weather.service";
import { WeatherController } from "./controllers/weather.controller";

const weatherProvider = new OpenMeteoProvider();
const weatherService = new WeatherService(weatherProvider);

export const weatherController = new WeatherController(weatherService);
