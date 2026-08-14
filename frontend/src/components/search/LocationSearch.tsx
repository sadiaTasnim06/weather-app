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
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack gap="3">
        <Input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search for a city"
          size="lg"
        />

        <Button type="submit" loading={isSearching} size="lg">
          Search
        </Button>
      </HStack>
    </form>
  );
}
