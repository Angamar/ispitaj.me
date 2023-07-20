// app/layout.tsx
"use client";

import { Grid, GridItem } from "@chakra-ui/react";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
            <GridItem
              as="aside"
              colSpan={{ base: 6, lg: 2, xl: 1 }}
              bg="purple"
              minHeight={{ lg: "100vh" }}
              p={{ base: "20px", lg: "30px" }}
            >
              Sidebar
            </GridItem>
            <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="40px">
              <Navbar />
              {children}
            </GridItem>
          </Grid>
        </Providers>
      </body>
    </html>
  );
}
