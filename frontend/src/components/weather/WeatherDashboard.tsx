import { Box, Grid, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import type { Location } from "../../types/location";
import type { Weather } from "../../types/weather";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";

interface WeatherDashboardProps {
  location: Location;
  weather?: Weather;
  isLoading: boolean;
}

export function WeatherDashboard({
  location,
  weather,
  isLoading,
}: WeatherDashboardProps) {
  if (isLoading) {
    return (
      <Stack gap="8">
        <Box
          borderWidth="1px"
          borderRadius="xl"
          p={{ base: "5", md: "8" }}
          bg="white"
        >
          <Stack gap="6">
            <Stack gap="2">
              <Skeleton height="28px" width="220px" />
              <Skeleton height="18px" width="120px" />
            </Stack>

            <Skeleton height="72px" width="180px" />

            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
              }}
              gap="4"
            >
              <SkeletonText noOfLines={2} />
              <SkeletonText noOfLines={2} />
            </Grid>
          </Stack>
        </Box>

        <Box>
          <Skeleton height="28px" width="180px" mb="4" />

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(7, 1fr)",
            }}
            gap="3"
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton key={index} height="150px" borderRadius="lg" />
            ))}
          </Grid>
        </Box>
      </Stack>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Stack gap="8">
      <CurrentWeather location={location} weather={weather} />

      <Forecast daily={weather.daily} />
    </Stack>
  );
}
