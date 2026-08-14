import { Box, Stack, Text } from "@chakra-ui/react";
import type { Weather } from "../../types/weather";
import { getWeatherDescription } from "../../utils/weatherCode";

interface ForecastCardProps {
  day: Weather["daily"][number];
}

export function ForecastCard({ day }: ForecastCardProps) {
  const date = new Date(`${day.date}T00:00:00`);

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
  }).format(date);

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" bg="white">
      <Stack gap="3" align="center">
        <Text fontWeight="600">{formattedDate}</Text>

        <Text fontSize="sm" color="gray.600">
          {getWeatherDescription(day.weatherCode)}
        </Text>

        <Stack direction="row" gap="3" align="baseline">
          <Text fontSize="xl" fontWeight="bold">
            {day.maxTemperature}°
          </Text>

          <Text fontSize="sm" color="gray.500">
            {day.minTemperature}°
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
