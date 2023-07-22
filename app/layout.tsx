// app/layout.tsx
"use client";
import { Flex, Grid, GridItem, Heading, Spacer } from "@chakra-ui/react";
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
          <Grid templateColumns="repeat(6, 1fr)" bg="#F3EADA">
            <GridItem
              as="aside"
              colSpan={{ base: 6, lg: 2, xl: 1 }}
              background="green.500"
              minHeight={{ lg: "100dvh" }}
              p={{ base: "20px", lg: "30px" }}
            >
              <Heading color="white">Ko zna - zna</Heading>
            </GridItem>
            <GridItem
              as="main"
              colSpan={{ base: 6, lg: 4, xl: 5 }}
              w="100%"
              p="40px"
              h="100dvh"
            >
              <Navbar />
              <Spacer pb={{ xl: "300px" }} />
              <Flex alignItems="center" justifyContent="center">
                {children}
              </Flex>
            </GridItem>
          </Grid>
        </Providers>
      </body>
    </html>
  );
}
