import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import type { Weather } from "../../types/weather";

interface WeatherDetailsProps {
  current: Weather["current"];
}

export function WeatherDetails({ current }: WeatherDetailsProps) {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        sm: "repeat(2, 1fr)",
      }}
      gap="4"
    >
      <GridItem>
        <Stack gap="1">
          <Text fontSize="sm" color="gray.600">
            Humidity
          </Text>

          <Text fontSize="lg" fontWeight="600">
            {current.humidity}%
          </Text>
        </Stack>
      </GridItem>

      <GridItem>
        <Stack gap="1">
          <Text fontSize="sm" color="gray.600">
            Wind
          </Text>

          <Text fontSize="lg" fontWeight="600">
            {current.windSpeed} km/h
          </Text>
        </Stack>
      </GridItem>
    </Grid>
  );
}
