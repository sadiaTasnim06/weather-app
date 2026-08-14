import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherPage } from "../pages/WeatherPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}
