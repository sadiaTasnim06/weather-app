const API_BASE_URL = "http://localhost:3000/api/v1";

export async function searchLocations(query: string) {
  const response = await fetch(
    `${API_BASE_URL}/locations?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search locations");
  }

  return response.json();
}
