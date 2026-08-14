import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import type { Weather } from "../../types/weather";
import { ForecastCard } from "./ForecastCard";

interface ForecastProps {
  daily: Weather["daily"];
}

export function Forecast({ daily }: ForecastProps) {
  return (
    <Box>
      <Heading size="lg" mb="4">
        7-Day Forecast
      </Heading>

      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 7 }} gap="3">
        {daily.map((day) => (
          <ForecastCard key={day.date} day={day} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
