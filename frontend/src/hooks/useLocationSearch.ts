import { useQuery } from "@tanstack/react-query";
import { searchLocations } from "../api/weatherApi";

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: ["locations", query],
    queryFn: () => searchLocations(query),
    enabled: Boolean(query),
  });
}
