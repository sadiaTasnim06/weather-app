import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <Box minH="100vh" bg="gray.50">
      {children}
    </Box>
  );
}
