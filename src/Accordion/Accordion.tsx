import { useState } from "react";

const accordionData = [
  { title: "JS basics", content: "JS basics content" },
  { title: "React basics", content: "React basics content" },
  { title: "Node basics", content: "Node basics content" },
  { title: "Full stack basics", content: "Full stack basics content" },
];

function Accordion() {
  const [data, setData] = useState(accordionData);
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPressAccordionItem = (index:number)=>{
    setActiveIndex(prev=> prev === index ? -1 : index);
  }

  if (data.length === 0) {
    <div>
      <p>No items available</p>
    </div>;
  }

  return (
    <div>
      {data.map((item, index) => (
        <AccordionItem
          key={item.title}
          isActive={index === activeIndex}
          itemIndex={index}
          onPress={onPressAccordionItem}
          {...item}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  title,
  content,
  isActive,
  itemIndex,
  onPress,
}: {
  title: string;
  content: string;
  isActive: boolean;
  itemIndex: number;
  onPress:(index: number)=>void;
}) {
  const handleOnClick = () => {
    onPress(itemIndex);
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <p onClick={handleOnClick} style={{ backgroundColor: "gray" }}>
        {title}
      </p>
      {isActive && <p>{content}</p>}
    </div>
  );
}

export default Accordion;
