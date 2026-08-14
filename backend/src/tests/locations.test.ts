import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";

describe("GET /api/v1/locations", () => {
  it("returns locations for a valid search query", async () => {
    const response = await request(app).get("/api/v1/locations?q=Malaga");

    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      {
        name: "Málaga",
        country: "Spain",
        latitude: 36.7213,
        longitude: -4.4214,
      },
    ]);
  });

  it("returns 400 when the search query is missing", async () => {
    const response = await request(app).get("/api/v1/locations");

    expect(response.status).toBe(400);
  });
});
