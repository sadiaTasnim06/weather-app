import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface ChakraUIProviderProps {
  children: ReactNode;
}

export function ChakraUIProvider({ children }: ChakraUIProviderProps) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
