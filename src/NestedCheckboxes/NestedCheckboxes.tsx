import { useState } from "react";

type CheckBox = {
  id: string;
  label: string;
  isChecked: boolean;
  children?: CheckBox[];
};

const config: CheckBox[] = [
  {
    id: "1",
    label: "First",
    isChecked: false,
    children: [
      { id: "2", label: "F1", isChecked: false },
      {
        id: "5",
        label: "F2",
        isChecked: false,
        children: [
          { id: "3", label: "F21", isChecked: false },
          { id: "4", label: "F22", isChecked: false },
        ],
      },
    ],
  },
  { id: "6", label: "Sec", isChecked: false },
];

function NestedCheckboxes() {
  const [data, setData] = useState(config);

  const handleOnClickCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetCheckBoxId: string
  ) => {
    const updateChildren = (item: CheckBox, isChecked: boolean): CheckBox => {
      return {
        ...item,
        isChecked,
        children: item.children?.map((child) =>
          updateChildren(child, isChecked)
        ),
      };
    };
    const updateNode = (item: CheckBox): CheckBox => {
      if (item.id === targetCheckBoxId) {
        const updatedIsCheckedStatus = !item.isChecked;

        const children = item.children?.map((child) =>
          updateChildren(child, updatedIsCheckedStatus)
        );

        return { ...item, isChecked: updatedIsCheckedStatus, children };
      }
      if (item.children) {
        const children = item.children.map((child) => updateNode(child));
        const areAllChildrenCheck = children.every((child) => child.isChecked);
        console.log("targetCheckBoxId", item.id, areAllChildrenCheck);
        return {
          ...item,
          isChecked: areAllChildrenCheck,
          children,
        };
      }
      return item;
    };

    setData((prev) => prev.map((item) => updateNode(item)));
  };

  return (
    <div>
      {data.map((item, index) => (
        <CheckBoxItem
          checkBox={item}
          key={index}
          handleOnClickCheckBox={handleOnClickCheckBox}
        />
      ))}
    </div>
  );
}

function CheckBoxItem({
  checkBox,
  handleOnClickCheckBox,
}: {
  checkBox: CheckBox;
  handleOnClickCheckBox: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}) {
  return (
    <div style={{ marginLeft: 40 }}>
      <span>{checkBox.label}</span>
      <input
        type="checkbox"
        checked={checkBox.isChecked}
        onChange={(e) => handleOnClickCheckBox(e, checkBox.id)}
      />
      {checkBox.children?.map((item, index) => (
        <CheckBoxItem
          checkBox={item}
          key={index}
          handleOnClickCheckBox={handleOnClickCheckBox}
        />
      ))}
    </div>
  );
}

export default NestedCheckboxes;
