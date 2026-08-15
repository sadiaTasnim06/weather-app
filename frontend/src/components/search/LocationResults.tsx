import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import type { Location } from '../../types/location';
import { TEST_IDS } from '../../constants/testIds';

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
      <Heading size="sm" mb="3" color="gray.700">
        Choose a location
      </Heading>

      <Box
        maxH="260px"
        overflowY="auto"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="xl"
        bg="white"
        shadow="sm"
      >
        <Stack gap="0">
          {locations.map((location) => (
            <Box
              key={`${location.latitude}-${location.longitude}`}
              as="button"
              data-cy={TEST_IDS.locationResult}
              width="100%"
              textAlign="left"
              px="5"
              py="4"
              borderBottomWidth="1px"
              borderColor="gray.100"
              _last={{ borderBottomWidth: '0' }}
              _hover={{
                bg: 'gray.50',
              }}
              _active={{
                bg: 'gray.100',
              }}
              transition="background 0.15s ease"
              cursor="pointer"
              onClick={() => onSelect(location)}
            >
              <Stack gap="1">
                <Text fontSize="md" fontWeight="600" color="gray.800">
                  {location.name}
                </Text>

                <Text fontSize="sm" color="gray.500">
                  {location.country}
                </Text>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
