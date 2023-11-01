"use client";

import { Button, useDisclosure, Spacer, VStack } from "@chakra-ui/react";
import { useQuizContext } from "@/contexts/QuizContext";
import GameModeCard from "@/components/GameModeCard";
import PlayerModal from "@/components/PlayerModal";
import { useEffect } from "react";

export default function Quiz() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { restartGame } = useQuizContext();

  useEffect(() => {
    restartGame();
  }, []);

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
