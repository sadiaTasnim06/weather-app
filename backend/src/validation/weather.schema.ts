import { z } from "zod";

export const searchLocationsSchema = z.object({
  q: z.string().min(1),
});

export const getWeatherSchema = z.object({
  latitude: z.coerce.number().finite(),
  longitude: z.coerce.number().finite(),
});
