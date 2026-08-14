import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import type { Location } from "../../types/location";
import type { Weather } from "../../types/weather";
import { getWeatherDescription } from "../../utils/weatherCode";
import { WeatherDetails } from "./WeatherDetails";

interface CurrentWeatherProps {
  location: Location;
  weather: Weather;
}

export function CurrentWeather({ location, weather }: CurrentWeatherProps) {
  const { current } = weather;

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      p={{ base: "5", md: "8" }}
      bg="white"
    >
      <Stack gap="6">
        <Box>
          <Heading size="lg">
            {location.name}, {location.country}
          </Heading>

          <Text color="gray.600" mt="1">
            {getWeatherDescription(current.weatherCode)}
          </Text>
        </Box>

        <Text
          fontSize={{ base: "5xl", md: "7xl" }}
          fontWeight="bold"
          lineHeight="1"
        >
          {current.temperature}°C
        </Text>

        <WeatherDetails current={current} />
      </Stack>
    </Box>
  );
}
