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
  Spacer,
  VStack,
} from "@chakra-ui/react";

import SettingsModal from "@/components/SettingsModal";
import GameModeCard from "@/components/GameModeCard";
import PlayerModal from "@/components/PlayerModal";

import { SettingsIcon } from "@chakra-ui/icons";

import NextLink from "next/link";

export default function Quiz() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Spacer />
      <VStack gap="40px">
        <Button size="lg" w="100%" onClick={onOpen}>
          Dodaj igrača
        </Button>
        <GameModeCard
          name="Ko zna - zna"
          link="/ko-zna-zna"
          description="Odgovori na određeni set pitanja gde za svako pitanje imaš
              vremensko ograničenje. Tačni odgovori daju poene, netačni
              oduzimaju."
        />
        <GameModeCard
          name="Potera"
          link="/potera"
          description="Odgovori na što više pitanja u zadatom vremenskom roku!"
        />
      </VStack>
      <Spacer />
      <PlayerModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
