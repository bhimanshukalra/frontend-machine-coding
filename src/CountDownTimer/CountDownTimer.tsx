import { useEffect, useRef, useState } from "react";
import "./CountDownTimer.css";

const currentTimeInitialState = {
  hour: 0,
  minute: 0,
  second: 0,
};

export default function CountDownTimer() {
  const [currentTime, setCurrentTime] = useState(currentTimeInitialState);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const intervalIdRef = useRef<number>(null);

  const onHandleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "hour" | "minute" | "second"
  ) => {
    const currentVal = parseInt(event.target.value) || 0;
    const updatedTime = { ...currentTime };
    updatedTime[field] = currentVal;
    updatedTime.minute += Math.floor(updatedTime.second / 60);
    updatedTime.second %= 60;
    updatedTime.hour += Math.floor(updatedTime.minute / 60);
    updatedTime.minute %= 60;

    setCurrentTime(updatedTime);
  };

  const onClickStart = () => {
    if (
      currentTime.hour === 0 &&
      currentTime.minute === 0 &&
      currentTime.second === 0
    ) {
      return;
    }
    setIsTimerActive(!isTimerActive);
  };

  const onClickReset = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    setCurrentTime(currentTimeInitialState);
  };

  useEffect(() => {
    if (!isTimerActive) {
      return;
    }
    intervalIdRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        const updatedTime = { ...prev };
        updatedTime.second--;
        if (updatedTime.second < 0) {
          updatedTime.minute--;
          updatedTime.second = 59;
        }
        if (updatedTime.minute < 0) {
          updatedTime.hour--;
          updatedTime.minute = 59;
        }
        if (updatedTime.hour < 0) {
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
          }
          setIsTimerActive(false);
          return { hour: 0, minute: 0, second: 0 };
        }
        return updatedTime;
      });
    }, 1000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isTimerActive]);

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="HHH"
          disabled={isTimerActive}
          value={
            !isTimerActive && currentTime.hour === 0 ? "" : currentTime.hour
          }
          onChange={(e) => onHandleChange(e, "hour")}
        />
        <input
          type="text"
          placeholder="MMM"
          disabled={isTimerActive}
          value={
            !isTimerActive && currentTime.minute === 0 ? "" : currentTime.minute
          }
          onChange={(e) => onHandleChange(e, "minute")}
        />
        <input
          type="text"
          placeholder="SSS"
          disabled={isTimerActive}
          value={
            !isTimerActive && currentTime.second === 0 ? "" : currentTime.second
          }
          onChange={(e) => onHandleChange(e, "second")}
        />
      </div>
      <div className="btn-container">
        <button onClick={onClickStart}>
          {isTimerActive ? "Pause" : "Start"}
        </button>
        <button onClick={onClickReset}>Reset</button>
      </div>
    </div>
  );
}
