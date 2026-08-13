import { z } from "zod";

export const searchLocationsSchema = z.object({
  q: z.string().min(1),
});
