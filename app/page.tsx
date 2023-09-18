"use client";

import { Button, useDisclosure, Spacer, VStack } from "@chakra-ui/react";

import GameModeCard from "@/components/GameModeCard";
import PlayerModal from "@/components/PlayerModal";

export default function Quiz() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Spacer />
      <VStack gap="40px">
        <Button size="lg" w="100%" onClick={onOpen}>
          Izmeni ime igrača
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
