import { Box, Stack, Text } from '@chakra-ui/react';
import type { Weather } from '../../types/weather';
import { getWeatherDescription } from '../../utils/weatherCode';
import { formatWeekday } from '../../utils/date';

interface ForecastCardProps {
  day: Weather['daily'][number];
}

export function ForecastCard({ day }: ForecastCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={{ base: '3', md: '4' }}
      bg="white"
      minW="0"
    >
      <Stack gap="3" align="center" textAlign="center">
        <Text fontWeight="600" fontSize="sm">
          {formatWeekday(day.date)}
        </Text>

        <Text fontSize="xs" color="gray.600" lineHeight="short" minH="32px">
          {getWeatherDescription(day.weatherCode)}
        </Text>

        <Stack direction="row" gap="2" align="baseline">
          <Text fontSize="lg" fontWeight="bold">
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
