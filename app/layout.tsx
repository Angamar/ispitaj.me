// app/layout.tsx
"use client";
import { Flex, Grid, GridItem, Heading, Spacer, Text } from "@chakra-ui/react";
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
            {/* <GridItem
              as="aside"
              colSpan={{ base: 6, lg: 2, xl: 1 }}
              background="green.500"
              minHeight={{ lg: "100dvh" }}
              p={{ base: "20px", lg: "30px" }}
            >
              <Text color="white">Ko zna - zna</Text>
              <Text color="white">Potera</Text>
            </GridItem> */}
            <GridItem
              as="main"
              colSpan={{ base: 6 }}
              w="100%"
              p="40px"
              h="100dvh"
            >
              <Navbar />
              <Flex
                flexDir="column"
                justifyContent="space-between"
                alignItems="center"
                height="94%"
              >
                {children}
              </Flex>
            </GridItem>
          </Grid>
        </Providers>
      </body>
    </html>
  );
}
