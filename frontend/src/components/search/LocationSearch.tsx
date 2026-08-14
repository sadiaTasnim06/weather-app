import { Button, HStack, Input } from "@chakra-ui/react";

interface LocationSearchProps {
  query: string;
  isSearching: boolean;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
}

export function LocationSearch({
  query,
  isSearching,
  onQueryChange,
  onSearch,
}: LocationSearchProps) {
  return (
    <HStack gap="3">
      <Input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search for a city"
        size="lg"
      />

      <Button type="button" onClick={onSearch} loading={isSearching} size="lg">
        Search
      </Button>
    </HStack>
  );
}
