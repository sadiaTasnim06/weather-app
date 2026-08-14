import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../api/weatherApi";

export function useWeather(
  latitude: number | undefined,
  longitude: number | undefined,
) {
  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => {
      if (latitude === undefined || longitude === undefined) {
        throw new Error("Location coordinates are required");
      }

      return getWeather(latitude, longitude);
    },
    enabled: latitude !== undefined && longitude !== undefined,
  });
}
