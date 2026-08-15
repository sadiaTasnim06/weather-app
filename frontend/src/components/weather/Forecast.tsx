import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import type { Weather } from '../../types/weather';
import { ForecastCard } from './ForecastCard';

interface ForecastProps {
  daily: Weather['daily'];
}

export function Forecast({ daily }: ForecastProps) {
  return (
    <Box>
      <Heading size="lg" mb="4">
        7-Day Forecast
      </Heading>

      <Box overflowX={{ base: 'auto', lg: 'visible' }} pb="2">
        <SimpleGrid
          minW={{ base: '700px', lg: 'auto' }}
          columns={{ base: 7, lg: 7 }}
          gap={{ base: '3', lg: '4' }}
        >
          {daily.map((day) => (
            <ForecastCard key={day.date} day={day} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
