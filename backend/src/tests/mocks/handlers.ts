import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://geocoding-api.open-meteo.com/v1/search", () => {
    return HttpResponse.json({
      results: [
        {
          name: "Málaga",
          country: "Spain",
          latitude: 36.7213,
          longitude: -4.4214,
        },
      ],
    });
  }),
  http.get("https://api.open-meteo.com/v1/forecast", () => {
    return HttpResponse.json({
      current: {
        temperature_2m: 28.5,
        relative_humidity_2m: 60,
        wind_speed_10m: 15,
        weather_code: 0,
      },
      daily: {
        time: ["2026-08-14", "2026-08-15"],
        temperature_2m_max: [32, 33],
        temperature_2m_min: [22, 23],
        weather_code: [0, 1],
      },
    });
  }),
];
