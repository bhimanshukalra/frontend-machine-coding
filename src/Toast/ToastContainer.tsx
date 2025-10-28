import "./Toast.css";

import { useEffect, useRef, useState } from "react";
import { Toast } from "./Toast";

// Define possible types of toast notifications
export type ToastType = "Success" | "Info" | "Warning" | "Error";
type ToastItem = { id: number; type: ToastType };

export default function ToastContainer() {
  // Store list of active toasts
  const [toastList, setToastList] = useState<ToastItem[]>([]);
  // Store timeouts for auto-dismissing toasts
  const timersRef = useRef<Record<number, number>>({});

  // Handler to show a new toast of specified type
  const onClickShowToast = (type: ToastType) => () => {
    const id = Date.now();
    // Add new toast to the list
    setToastList((prev) => [...prev, { id, type }]);
    // Set auto-dismiss timer (5 seconds)
    timersRef.current[id] = setTimeout(() => {
      onPressCloseToast(id);
    }, 5000);
  };

  // Configuration for toast type buttons
  const buttonType: { label: ToastType; onClick: () => void }[] = [
    { label: "Success", onClick: onClickShowToast("Success") },
    { label: "Info", onClick: onClickShowToast("Info") },
    { label: "Warning", onClick: onClickShowToast("Warning") },
    { label: "Error", onClick: onClickShowToast("Error") },
  ];

  // Handler to close a specific toast by its ID
  const onPressCloseToast = (targetToastId: number) => {
    // Remove toast from list
    setToastList((prev) => {
      return prev.filter((item) => item.id !== targetToastId);
    });
    // Clear auto-dismiss timer
    clearTimeout(timersRef.current[targetToastId]);
    delete timersRef.current[targetToastId];
  };

  // Cleanup timers when component unmounts
  useEffect(() => {
    return () => {
      Object.keys(timersRef.current).map((id) => onPressCloseToast(+id));
    };
  }, []);

  return (
    <div>
      <div className="toast-parent">
        {toastList.map(({ id, type }) => (
          <Toast
            key={id}
            type={type}
            onPressClose={() => onPressCloseToast(id)}
          />
        ))}
      </div>
      {buttonType.map(({ label, onClick }) => (
        <button key={label} onClick={onClick} className="show-toast-item">
          {label} toast
        </button>
      ))}
    </div>
  );
}
