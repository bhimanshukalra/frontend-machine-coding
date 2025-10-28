import "./Toast.css";

import { useEffect, useState } from "react";
import type { ToastType } from "./ToastContainer";

// Props interface for the Toast component
interface ToastProps {
  // Type of toast (Success/Error/Warning/Info)
  type: ToastType;
  // Callback to handle toast dismissal
  onPressClose: () => void;
}

// Constants for progress bar animation

// How much progress increases each step
const PROGRESS_INCREMENT_STEP = 25;
// How often progress updates (in ms)
const PROGRESS_UPDATE_TIME_INTERVAL = 10;

export function Toast({ type, onPressClose }: ToastProps) {
  // State to track animation progress (0-100)
  const [progress, setProgress] = useState(0);
  // Get background color based on toast type
  const backgroundColor = getBackgroundColor(type);

  // Set up progress animation
  useEffect(() => {
    // Update progress at regular intervals
    const intervalId = setInterval(() => {
      setProgress((prev) => prev + PROGRESS_INCREMENT_STEP);
    }, PROGRESS_UPDATE_TIME_INTERVAL);

    // Stop animation when progress reaches 100%
    if (progress >= 100) {
      clearInterval(intervalId);
    }

    // Cleanup interval on unmount or when progress changes
    return () => {
      clearInterval(intervalId);
    };
  }, [progress]);

  return (
    <div
      style={{
        backgroundColor,
        transform: `translateX(${100 - progress}%)`,
      }}
      className="toast-item"
    >
      {type}
      <span className="close-btn" onClick={onPressClose}>
        X
      </span>
    </div>
  );
}

// Helper function to determine toast background color based on type
function getBackgroundColor(type: ToastType) {
  switch (type) {
    case "Success":
      return "#46af46"; // Green for success
    case "Error":
      return "#df5239"; // Red for error
    case "Warning":
      return "#fca200"; // Orange for warning
    case "Info":
      return "aqua"; // Blue for info
  }
}
