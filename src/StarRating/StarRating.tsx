import { useState } from "react";

function StarRating() {
  const [rating, setRating] = useState(1);
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <span>
      {Array(5)
        .fill(0)
        .map((item, index) => (
          <span
            key={index}
            onMouseMove={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
            onClick={() => setRating(index)}
            style={{
              fontSize: 100,
              color:
                (hoverIndex < 0 && index <= rating) || index <= hoverIndex
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
