import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraUIProvider } from "./providers/ChakraProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraUIProvider>
      <App />
    </ChakraUIProvider>
  </StrictMode>,
);
