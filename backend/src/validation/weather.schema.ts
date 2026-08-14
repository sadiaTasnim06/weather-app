import { z } from "zod";

export const searchLocationsSchema = z.object({
  q: z.string().min(1),
});

export const getWeatherSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});
