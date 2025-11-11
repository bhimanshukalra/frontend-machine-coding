import "./Board.css";

interface BoardProps {
  currentBoard: string[][];
  handleOnClick: (rowIndex: number, colIndex: number) => void;
}

export default function Board({ currentBoard, handleOnClick }: BoardProps) {
  const size = currentBoard.length;
  return (
    <div
      className="container"
      style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}
    >
      {currentBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            className="cell"
            onClick={() => handleOnClick(rowIndex, colIndex)}
            key={`${rowIndex}-${colIndex}`}
          >
            {/* {rowIndex}
            {colIndex} */}
            {cell}
          </div>
        ))
      )}
    </div>
  );
}
