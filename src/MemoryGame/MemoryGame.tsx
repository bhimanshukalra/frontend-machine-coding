import "./MemoryGame.css";
import useMemoryGame from "./useMemoryGame";

export default function MemoryGame() {
  const { cards, handleOnClick, isDisabled } = useMemoryGame();

  return (
    <div className="grid-container">
      {cards.map(({ id, isFlipped, number }, index) => (
        <button
          key={id}
          className="card-item"
          onClick={() => handleOnClick(index)}
          disabled={isDisabled}
        >
          {isFlipped ? number : "?"}
        </button>
      ))}
    </div>
  );
}
