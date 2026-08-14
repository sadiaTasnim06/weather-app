import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import type { Location } from "../types/location";
import { LocationSearch } from "../components/search/LocationSearch";
import { LocationResults } from "../components/search/LocationResults";
import { WeatherDashboard } from "../components/weather/WeatherDashboard";
import { useLocationSearch } from "../hooks/useLocationSearch";
import { useWeather } from "../hooks/useWeather";

export function WeatherPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [hasSearched, setHasSearched] = useState(false);
  const {
    data: locations = [],
    isFetching: isSearching,
    isError: isSearchError,
  } = useLocationSearch(submittedQuery);
  const {
    data: weather,
    isPending: isLoadingWeather,
    isError: isWeatherError,
  } = useWeather(selectedLocation?.latitude, selectedLocation?.longitude);

  async function handleSearch() {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    setHasSearched(true);
    setSelectedLocation(null);
    setSubmittedQuery(trimmedQuery);
  }

  function handleLocationSelect(location: Location) {
    setSelectedLocation(location);
  }
  function handleClearSearch() {
    setQuery("");
    setSubmittedQuery("");
    setSelectedLocation(null);
    setHasSearched(false);
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
          onClear={handleClearSearch}
        />

        {isSearching ? (
          <Box p="6" borderWidth="1px" borderRadius="xl" textAlign="center">
            <Text>Searching locations...</Text>
          </Box>
        ) : (
          <LocationResults
            locations={locations}
            onSelect={handleLocationSelect}
          />
        )}
        {hasSearched &&
          !isSearching &&
          !isSearchError &&
          locations.length === 0 && (
            <Box
              p="6"
              borderWidth="1px"
              borderRadius="xl"
              bg="white"
              textAlign="center"
            >
              <Heading size="md" mb="2">
                No locations found
              </Heading>

              <Text color="gray.600">Try searching for a different city.</Text>
            </Box>
          )}
        {hasSearched && isSearchError && (
          <Box p="6" borderWidth="1px" borderRadius="xl" bg="white">
            <Heading size="md" mb="2">
              Search failed
            </Heading>

            <Text color="gray.600">
              We couldn't search for that location. Please try again.
            </Text>
          </Box>
        )}
        {selectedLocation && isWeatherError && (
          <Box p="6" borderWidth="1px" borderRadius="xl" bg="white">
            <Heading size="md" mb="2">
              Weather unavailable
            </Heading>

            <Text color="gray.600">
              We couldn't load the weather for this location. Please try again.
            </Text>
          </Box>
        )}
        {selectedLocation && !isWeatherError && (
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
