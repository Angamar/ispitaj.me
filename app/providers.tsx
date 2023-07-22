// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QuizProvider } from "@/contexts/QuizContext";
import "@fontsource/overpass-mono/700.css";

const theme = extendTheme({
  fonts: {
    heading: `'Overpass Mono', sans-serif`,
    text: `'Overpass Mono', sans-serif`,
  },
  colors: {
    green: {
      100: "#5EC0B2",
      300: "#00C9A5",
      500: "#18A08B",
      700: "#148876",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QuizProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </QuizProvider>
  );
}
