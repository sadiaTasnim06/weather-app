import { Box, Button, HStack, Input } from "@chakra-ui/react";

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
      <HStack gap="3">
        <Box position="relative" flex="1">
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search for a city"
            size="lg"
            pr={query ? "12" : undefined}
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
              onClick={onClear}
              aria-label="Clear search"
            >
              ×
            </Button>
          )}
        </Box>

        <Button type="submit" loading={isSearching} size="lg">
          Search
        </Button>
      </HStack>
    </form>
  );
}
