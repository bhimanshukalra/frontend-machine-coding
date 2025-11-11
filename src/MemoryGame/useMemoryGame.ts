import { useEffect, useState } from "react";
import { generateGrid } from "./utils";

type Card = {
  id: number;
  number: number;
  isFlipped: boolean;
};
export default function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>(generateGrid());
  const [isDisabled, setIsDisabled] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const flipBack = (index: number) => {
    setCards((prev) => {
      const updatedCards = [...prev];
      updatedCards[index].isFlipped = false;
      return updatedCards;
    });
  };

  const handleOnClick = (index: number) => {
    if (isDisabled || cards[index].isFlipped) {
      return;
    }
    setCards((prev) => {
      const updatedCards = [...prev];
      updatedCards[index].isFlipped = true;
      return updatedCards;
    });
    setFlippedCards((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false);
        if (cards[flippedCards[0]].number != cards[flippedCards[1]].number) {
          flipBack(flippedCards[0]);
          flipBack(flippedCards[1]);
        }
        setFlippedCards([]);
      }, 3000);
    }
  }, [flippedCards]);

  return { cards, isDisabled, handleOnClick };
}
