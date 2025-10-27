import { useState } from "react";

function GoogleSheet() {
  const [data, setData] = useState([
    ["1", "2"],
    ["3", "4"],
  ]);

  const handleOnChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const updatedData = data.map((row, rowI) =>
      row.map((item, colI) =>
        rowI === rowIndex && colI === colIndex ? value : item
      )
    );
    setData(updatedData);
  };

  const onClickAddRow = () => {
    setData((prev) => [...prev, Array(prev[0].length).fill("")]);
  };

  const onClickAddCol = () => {
    setData((prev) => prev.map((row) => [...row, ""]));
  };

  return (
    <div style={{}}>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} style={{ flex: 1, flexDirection: "row" }}>
          {row.map((item, index) => (
            <input
              key={index}
              style={{ borderWidth: 1, borderColor: "black" }}
              value={item}
              onChange={(e) => handleOnChange(rowIndex, index, e.target.value)}
            />
          ))}
        </div>
      ))}
      <button onClick={onClickAddRow}>Add row</button>
      <button onClick={onClickAddCol}>Add col</button>
    </div>
  );
}

export default GoogleSheet;
