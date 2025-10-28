import { useEffect, useRef, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1529391387768-ab39476d6a52?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=626",
  "https://images.unsplash.com/photo-1542641734-3b824eaabad0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
  "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1541753236788-b0ac1fc5009d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1112",
  "https://images.unsplash.com/photo-1519114056088-b877fe073a5e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1633",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageInFocus, setIsImageInFocus] = useState(false);
  const currentIntervalId = useRef<number>(0);

  const getIncrementIndex = (index: number) => {
    if (index === images.length - 1) {
      return 0;
    } else {
      return index + 1;
    }
  };

  const getDecrementIndex = (index: number) => {
    if (index === 0) {
      return images.length - 1;
    } else {
      return index - 1;
    }
  };

  const handleOnClickNext = () => {
    setCurrentIndex((prev) => getIncrementIndex(prev));
  };

  const handleOnClickPrev = () => {
    setCurrentIndex((prev) => getDecrementIndex(prev));
  };

  useEffect(() => {
    if (isImageInFocus) {
      return;
    }
    const intervalId = setInterval(() => {
      handleOnClickNext();
    }, 1000);

    currentIntervalId.current = intervalId;

    return () => {
      clearInterval(intervalId);
    };
  }, [isImageInFocus]);

  useEffect(() => {
    if (!isImageInFocus) {
      return;
    }
    clearInterval(currentIntervalId.current);
  }, [isImageInFocus]);

  const handleMouseEnter = () => {
    setIsImageInFocus(true);
  };

  const handleMouseLeave = () => {
    setIsImageInFocus(false);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          backgroundColor: "black",
          padding: 10,
          borderRadius: 100,
          left: 20,
        }}
        onClick={handleOnClickPrev}
      >
        {"<"}
      </span>
      <img height={300} width={"100%"} src={images[currentIndex]} />
      <span
        style={{
          position: "absolute",
          top: "50%",
          right: 20,
          backgroundColor: "black",
          padding: 10,
          borderRadius: 100,
        }}
        onClick={handleOnClickNext}
      >
        {">"}
      </span>
      <p
        style={{
          position: "absolute",
          left: "50%",
          top: 10,
          backgroundColor: "black",
          padding: 10,
          borderRadius: 100,
        }}
      >
        {currentIndex}
      </p>
    </div>
  );
}
