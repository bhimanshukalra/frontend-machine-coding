import { useState } from "react";

function StarRating() {
  const [rating, setRating] = useState(1);
  const [hoverIndex, setHoverIndex] = useState(0);

  return (
    <span>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <span
          key={item}
          onMouseMove={(event) => {
            setHoverIndex(
              index +
                Math.ceil(
                  event.nativeEvent.offsetX / event.currentTarget.offsetWidth
                )
            );
          }}
          onMouseLeave={() => {
            setHoverIndex(0);
          }}
          onClick={() => {
            setRating(index);
          }}
          style={{
            fontSize: 100,
            color:
              hoverIndex > 0 && index >= hoverIndex
                ? "black"
                : index <= rating || index < hoverIndex
                ? "yellow"
                : "black",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default StarRating;
