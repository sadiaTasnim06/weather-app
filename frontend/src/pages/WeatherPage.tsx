import { Box, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";
import type { Weather } from "../types/weather";
import type { Location } from "../types/location";
import { searchLocations, getWeather } from "../api/weatherApi";
import { LocationSearch } from "../components/search/LocationSearch";
import { LocationResults } from "../components/search/LocationResults";
import { WeatherDashboard } from "../components/weather/WeatherDashboard";

export function WeatherPage() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [isLoadingWeather, setIsWeatherLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setIsSearching(true);

    try {
      const results = await searchLocations(query);
      setLocations(results);
    } finally {
      setIsSearching(false);
    }
  }

  async function handleLocationSelect(location: Location) {
    setSelectedLocation(location);
    setWeather(null);
    setIsWeatherLoading(true);

    try {
      const result = await getWeather(location.latitude, location.longitude);

      setWeather(result);
    } finally {
      setIsWeatherLoading(false);
    }
  }

  return (
    <Box maxW="1200px" mx="auto" px="4" py="8">
      <Stack gap="8">
        <Heading size="2xl">Weather App</Heading>

        <LocationSearch
          query={query}
          isSearching={isSearching}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />

        <LocationResults
          locations={locations}
          onSelect={handleLocationSelect}
        />

        {selectedLocation && (
          <WeatherDashboard
            location={selectedLocation}
            weather={weather}
            isLoading={isLoadingWeather}
          />
        )}
      </Stack>
    </Box>
  );
}
