import { useState } from "react";

let id = 0;

type Chip = {
  id: number;
  label: string;
};

function ChipsInput() {
  const [chips, setChips] = useState<Chip[]>([]);
  const [currentInput, setCurrentInput] = useState('')

  const handleOnSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if (e.key === "Enter" && value.length > 0) {
      const newChipData = { id: ++id, label: value };
      console.log("new", chips, newChipData);
      setChips((prev) => [...prev, newChipData]);
      setCurrentInput('')
    }
  };

  const handleOnPressDelete = (id: number) => {
    setChips((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value)
  };

  return (
    <div>
      <input value={currentInput} onChange={handleOnChange} onKeyDown={(e) => handleOnSubmit(e)} />
      <div style={{ marginTop: 10 }}>
        {chips.map((item) => (
          <Chip
            chidData={item}
            key={item.id}
            onClickDelete={handleOnPressDelete}
          />
        ))}
      </div>
    </div>
  );
}

function Chip({
  chidData,
  onClickDelete,
}: {
  chidData: Chip;
  onClickDelete: (id: number) => void;
}) {
  const onPressDelete = () => {
    onClickDelete(chidData.id);
  };

  return (
    <span style={{ backgroundColor: "grey", borderRadius: 10, padding: 4, marginRight: 8 }}>
      {chidData.id} {chidData.label} <span style={{backgroundColor:'white', paddingLeft: 2, paddingRight: 2, marginRight: 4}} onClick={onPressDelete}>X</span>
    </span>
  );
}

export default ChipsInput;
