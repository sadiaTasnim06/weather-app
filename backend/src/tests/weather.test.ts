import { http, HttpResponse } from "msw";
import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";
import { server } from "./mocks/server";

describe("GET /api/v1/weather", () => {
  it("returns weather for valid coordinates", async () => {
    const response = await request(app).get("/api/v1/weather").query({
      latitude: 36.7213,
      longitude: -4.4214,
    });

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      current: {
        temperature: 28.5,
        humidity: 60,
        windSpeed: 15,
        weatherCode: 0,
      },
      daily: [
        {
          date: "2026-08-14",
          maxTemperature: 32,
          minTemperature: 22,
          weatherCode: 0,
        },
        {
          date: "2026-08-15",
          maxTemperature: 33,
          minTemperature: 23,
          weatherCode: 1,
        },
      ],
    });
  });

  it("returns 400 when latitude and longitude are missing", async () => {
    const response = await request(app).get("/api/v1/weather");

    expect(response.status).toBe(400);
  });

  it("returns 400 when latitude is invalid", async () => {
    const response = await request(app).get(
      "/api/v1/weather?latitude=100&longitude=10",
    );

    expect(response.status).toBe(400);
  });
  it("returns 400 when longitude is invalid", async () => {
    const response = await request(app).get(
      "/api/v1/weather?latitude=10&longitude=200",
    );

    expect(response.status).toBe(400);
  });
  it("returns 502 when the weather provider fails", async () => {
    server.use(
      http.get("https://api.open-meteo.com/v1/forecast", () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );

    const response = await request(app).get("/api/v1/weather").query({
      latitude: 36.7213,
      longitude: -4.4214,
    });

    expect(response.status).toBe(502);
    expect(response.body).toEqual({
      error: {
        code: "WEATHER_PROVIDER_ERROR",
        message: "Weather provider request failed",
      },
    });
  });
});
