import { useEffect, useRef, useState } from "react";
import "./SnakeGame.css";

const GRID_SIZE = 15;

const grid = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);

const snakeBodyInitialState = [{ x: 5, y: 5 }];

const upDirection = { x: 0, y: -1 };
const downDirection = { x: 0, y: 1 };
const leftDirection = { x: -1, y: 0 };
const rightDirection = { x: 1, y: 0 };

type Coordinate = { x: number; y: number };

const DELAY = 200;

export default function SnakeGame() {
  const [snakeBody, setSnakeBody] = useState<Coordinate[]>(
    snakeBodyInitialState
  );
  const directionRef = useRef<Coordinate>(rightDirection);

  const generateFood = () => {
    while (true) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);

      const snakeCoincideFood = snakeBody.find(
        (item) => item.x === x && item.y === y
      );
      if (!snakeCoincideFood) {
        return { x, y };
      }
    }
  };

  const foodRef = useRef<Coordinate>(generateFood());

  const isCurrentDivPartOfSnakeBody = (x: number, y: number) => {
    return snakeBody.find((item) => item.x === x && item.y === y);
  };

  const resetSnakeBody = () => {
    setSnakeBody(snakeBodyInitialState);
    directionRef.current = rightDirection;
  };

  const isSnakeBodyIntersect = (
    snakeBody: Coordinate[],
    newHead: Coordinate
  ) => {
    return snakeBody.find(
      (item) => item.x === newHead.x && item.y === newHead.y
    );
  };

  const moveSnakeAhead = () => {
    setSnakeBody((prev) => {
      const newHead = {
        x: prev[0].x + directionRef.current.x,
        y: prev[0].y + directionRef.current.y,
      };
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE ||
        isSnakeBodyIntersect(prev, newHead)
      ) {
        resetSnakeBody();
      }
      const updatedBody = [...prev];

      updatedBody.unshift(newHead);
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        foodRef.current = generateFood();
      } else {
        updatedBody.pop();
      }
      return updatedBody;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(moveSnakeAhead, DELAY);
    return () => clearInterval(intervalId);
  }, []);

  const handleDirection = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === "ArrowUp" && directionRef.current != downDirection) {
      directionRef.current = upDirection;
    } else if (key === "ArrowDown" && directionRef.current != upDirection) {
      directionRef.current = downDirection;
    } else if (key === "ArrowRight" && directionRef.current != leftDirection) {
      directionRef.current = rightDirection;
    } else if (key === "ArrowLeft" && directionRef.current != rightDirection) {
      directionRef.current = leftDirection;
    }
  };

  const isFoodDiv = (x: number, y: number) => {
    return foodRef.current.x === x && foodRef.current.y === y;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleDirection);
    return () => {
      window.removeEventListener("keydown", handleDirection);
    };
  });

  return (
    <div
      className="container"
      style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
    >
      {grid.map((row, rowIndex) =>
        row.map((_, colIndex) => (
          <div
            className={`grid-cell ${
              isCurrentDivPartOfSnakeBody(colIndex, rowIndex) && "snake"
            } ${isFoodDiv(colIndex, rowIndex) && "food"}`}
            key={`${rowIndex}-${colIndex}`}
          />
        ))
      )}
    </div>
  );
}
