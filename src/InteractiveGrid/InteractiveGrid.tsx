import { useEffect, useRef, useState } from "react";
import "./InteractiveGrid.css";

const GRID_SIZE = 3;
const extraIndexes = [
  [1, 0],
  [2, 0],
  [1, 2],
  [2, 2],
];

const gridInitialState = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill(false)
);

export default function InteractiveGrid() {
  const [grid, setGrid] = useState(gridInitialState);
  const queue = useRef<[number, number][]>([]);
  const isAnimationActive = useRef(false);

  const onHandleClick = (rowIndex: number, colIndex: number) => {
    if (grid[rowIndex][colIndex] || isAnimationActive.current) {
      return;
    }
    const updatedGrid = grid.map((row) => [...row]);
    updatedGrid[rowIndex][colIndex] = true;
    queue.current.push([rowIndex, colIndex]);
    setGrid(updatedGrid);
  };

  useEffect(() => {
    if (queue.current.length === GRID_SIZE * GRID_SIZE) {
      isAnimationActive.current = true;
    }
  }, [grid]);

  useEffect(() => {
    if (!isAnimationActive.current) {
      return;
    }

    const intervalId = setInterval(() => {
      const firstItem = queue.current.shift();
      if (firstItem) {
        const rowIndex = firstItem[0];
        const colIndex = firstItem[1];
        setGrid((prev) => {
          const updatedGrid = prev.map((row) => [...row]);
          updatedGrid[rowIndex][colIndex] = false;
          return updatedGrid;
        });
      } else {
        clearInterval(intervalId);
        isAnimationActive.current = false;
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [grid]);

  return (
    <div className="container">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isValidIndex = !extraIndexes.find(
            (item) => item[0] === rowIndex && item[1] === colIndex
          );
          if (!isValidIndex) {
            return (
              <div key={`${rowIndex}-${colIndex}`} className={"inActiveCell"} />
            );
          }
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell && "activeCell"}`}
              onClick={() => onHandleClick(rowIndex, colIndex)}
            >
              ({rowIndex}, {colIndex})
            </div>
          );
        })
      )}
    </div>
  );
}
