import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraUIProvider } from "./providers/ChakraProvider";
import { QueryProvider } from "./providers/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraUIProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ChakraUIProvider>
  </StrictMode>,
);
