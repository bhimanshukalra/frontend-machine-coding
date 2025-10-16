import { useEffect, useState } from "react";

export interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div
      style={{
        border: "2px solid black",
        borderRadius: 10,
        overflow: "hidden",
        margin: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "yellowgreen",
          transform: `translateX(${progress - 100}%)`,
          padding: 2,
          height: 20,
          transition: "0.1s ease-in",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemax={100}
        aria-valuemin={0}
      >
        <span
          style={{
            position: "absolute",
            right: progress >= 60 ? 20 : -40 + progress,
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
};

const Parent = () => {

  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProgress((prev) => prev + 1);
    }, 100);
    if (currentProgress === 100) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [currentProgress]);

  return (
    <div>
      <ProgressBar progress={currentProgress} />
    </div>
  );
};

export default Parent;
