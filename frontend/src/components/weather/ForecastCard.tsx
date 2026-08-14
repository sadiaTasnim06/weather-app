import { Box, Stack, Text } from "@chakra-ui/react";
import type { Weather } from "../../types/weather";
import { getWeatherDescription } from "../../utils/weatherCode";
import { formatWeekday } from "../../utils/date";

interface ForecastCardProps {
  day: Weather["daily"][number];
}

export function ForecastCard({ day }: ForecastCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" bg="white">
      <Stack gap="3" align="center">
        <Text fontWeight="600">{formatWeekday(day.date)}</Text>

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
