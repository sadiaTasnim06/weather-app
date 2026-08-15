import { Box, Button, HStack, Input } from '@chakra-ui/react';

interface LocationSearchProps {
  query: string;
  isSearching: boolean;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

export function LocationSearch({
  query,
  isSearching,
  onQueryChange,
  onSearch,
  onClear,
}: LocationSearchProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack gap="3" align="stretch" width="100%">
        <Box
          position="relative"
          flex="1"
          bg="white"
          borderRadius="xl"
          boxShadow="sm"
        >
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search for a city"
            size="lg"
            height="14"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.200"
            pr={query ? '12' : undefined}
            _hover={{
              borderColor: 'gray.300',
            }}
            _focus={{
              borderColor: 'blue.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
            }}
          />

          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              borderRadius="full"
              color="gray.500"
              _hover={{
                bg: 'gray.100',
                color: 'gray.700',
              }}
              onClick={onClear}
              aria-label="Clear search"
            >
              ×
            </Button>
          )}
        </Box>

        <Button
          type="submit"
          loading={isSearching}
          size="lg"
          height="14"
          px="8"
          borderRadius="xl"
          bg="gray.900"
          color="white"
          _hover={{
            bg: 'gray.800',
            transform: 'translateY(-1px)',
            boxShadow: 'md',
          }}
          transition="all 0.2s"
        >
          Search
        </Button>
      </HStack>
    </form>
  );
}
