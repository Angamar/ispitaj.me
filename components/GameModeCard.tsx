"use client";

import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  Link,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import SettingsModal from "@/components/SettingsModal";

import { SettingsIcon } from "@chakra-ui/icons";

import NextLink from "next/link";

interface GameModeCardProps {
  name: string;
  description: string;
  link: string;
}

export default function GameModeCard({
  name,
  description,
  link,
}: GameModeCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        maxWidth="600px"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{name}</Heading>

            <Text py="2">{description}</Text>
          </CardBody>

          <CardFooter gap="10px">
            <Link as={NextLink} href={link}>
              <Button variant="solid" colorScheme="blue">
                Igraj
              </Button>
            </Link>
            <IconButton
              aria-label="Podešavanja"
              onClick={onOpen}
              icon={<SettingsIcon />}
            />
          </CardFooter>
        </Stack>
      </Card>

      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
