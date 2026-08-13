import { useState } from "react";
import { searchLocations } from "./api/weatherApi";
import "./App.css";

type Location = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

function App() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const results = await searchLocations(query);
      setLocations(results);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Weather App</h1>

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a city"
      />

      <button type="button" onClick={handleSearch}>
        Search
      </button>

      {loading && <p>Searching...</p>}

      {locations.map((location) => (
        <div key={location.id}>
          <p>{location.name}</p>
          <p>
            {location.country} — {location.latitude}, {location.longitude}
          </p>
        </div>
      ))}
    </main>
  );
}

export default App;
