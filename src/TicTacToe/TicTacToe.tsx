import { useState } from "react";
import Board from "./components/Board";
import { checkWinner } from "./ticTacToeUtils";

interface TicTacToeProps {
  size?: number;
}

const DEFAULT_BOARD_SIZE = 3;

export default function TicTacToe({
  size = DEFAULT_BOARD_SIZE,
}: TicTacToeProps) {
  const currentBoardInitialState = Array.from({ length: size }, () =>
    new Array(size).fill("")
  );
  const [currentBoard, setCurrentBoard] = useState<string[][]>(
    currentBoardInitialState
  );
  const [isXTurn, setIsXTurn] = useState(true);
  const winner = checkWinner(currentBoard);
  const status = isXTurn ? "Player X turn" : "Player O turn";

  const handleOnClick = (rowIndex: number, colIndex: number) => {
    if (currentBoard[rowIndex][colIndex].length > 0 || winner) {
      return;
    }
    setCurrentBoard((prev) => {
      const updatedBoard = prev.map((row) => [...row]);
      updatedBoard[rowIndex][colIndex] = isXTurn ? "X" : "O";
      return updatedBoard;
    });
    setIsXTurn((prev) => !prev);
  };

  const onClickReset = () => {
    setCurrentBoard(currentBoardInitialState);
    setIsXTurn(true);
  };

  return (
    <>
      <Board currentBoard={currentBoard} handleOnClick={handleOnClick} />
      <p>{winner ? `Winner: ${winner}` : status} </p>
      <button onClick={onClickReset}>Reset</button>
    </>
  );
}
