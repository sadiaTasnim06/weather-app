import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import type { Location } from "../../types/location";
import { TEST_IDS } from "../../constants/testIds";

interface LocationResultsProps {
  locations: Location[];
  onSelect: (location: Location) => void;
}

export function LocationResults({ locations, onSelect }: LocationResultsProps) {
  if (locations.length === 0) {
    return null;
  }

  return (
    <Box>
      <Heading size="md" mb="3">
        Locations
      </Heading>

      <Box maxH="240px" overflowY="auto" borderWidth="1px" borderRadius="md">
        <Stack gap="0">
          {locations.map((location) => (
            <Button
              data-cy={TEST_IDS.locationResult}
              key={`${location.latitude}-${location.longitude}`}
              type="button"
              variant="ghost"
              justifyContent="flex-start"
              height="auto"
              width="100%"
              py="3"
              px="4"
              borderRadius="0"
              onClick={() => onSelect(location)}
            >
              <Stack align="flex-start" gap="0">
                <Text fontWeight="600">{location.name}</Text>

                <Text fontSize="sm" color="gray.600">
                  {location.country} — {location.latitude}, {location.longitude}
                </Text>
              </Stack>
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
