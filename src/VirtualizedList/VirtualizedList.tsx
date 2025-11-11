import { useState, type UIEvent } from "react";

const DEFAULT_LIST = Array.from({ length: 100000 }, (_, index) => index);
const DEFAULT_HEIGHT = 400;
const DEFAULT_WIDTH = 300;
const ITEM_HEIGHT = 35;

export default function VirtualizedListContainer() {
  return (
    <VirtualizedList
      inputList={DEFAULT_LIST}
      height={DEFAULT_HEIGHT}
      width={DEFAULT_WIDTH}
      itemHeight={ITEM_HEIGHT}
    />
  );
}

interface VirtualizedListProps {
  inputList: number[];
  height: number;
  width: number;
  itemHeight: number;
}

function VirtualizedList({
  inputList,
  height,
  itemHeight,
  width,
}: VirtualizedListProps) {
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)]);
  const visibleList = inputList.slice(indices[0], indices[1] + 1);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    console.log("scrollTop", scrollTop);
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
  };

  return (
    <div
      onScroll={handleScroll}
      style={{ height, width, backgroundColor: "grey", overflow: "auto" }}
    >
      <div
        style={{ height: inputList.length * itemHeight, position: "relative" }}
      >
        {visibleList.map((item, index) => (
          <div
            key={item}
            className="item"
            style={{
              height: itemHeight,
              backgroundColor: "coral",
              borderTop: "5px solid grey",
              position: "absolute",
              top: (indices[0] + index) * itemHeight,
              width: "100%",
              textAlign: "center",
            }}
          >{`Item ${item}`}</div>
        ))}
      </div>
    </div>
  );
}
