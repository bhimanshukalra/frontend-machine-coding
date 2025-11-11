import { useEffect, useState } from "react";
import "./App.css";
import { AutoCompleteSearchBar } from "./AutoCompleteSearchBar/AutoCompleteSearchBar";
import FileExplorer from "./FileExplorer/FileExplorer";
import Pagination from "./Pagination/Pagination";
import ProgressBar from "./ProgressBar/ProgressBar";
import { TabForm } from "./TabForm/TabForm";
import OtpInput from "./OtpInput/OtpInput";
import NestedCheckboxes from "./NestedCheckboxes/NestedCheckboxes";
import ChipsInput from "./ChipsInput/ChipsInput";
import ToDoList from "./ToDoList/ToDoList";
import Accordion from "./Accordion/Accordion";
import GoogleSheet from "./GoogleSheet/GoogleSheet";
import StarRating from "./StarRating/StarRating";
import ToastContainer from "./Toast/ToastContainer";
import Carousel from "./Carousel/Carousel";
import CountDownTimer from "./CountDownTimer/CountDownTimer";
import InteractiveGrid from "./InteractiveGrid/InteractiveGrid";
import TicTacToe from "./TicTacToe/TicTacToe";

function App() {
  return (
    <>
      {/* <AutoCompleteSearchBar /> */}
      {/* <TabForm /> */}
      {/* <Pagination /> */}
      {/* <FileExplorer /> */}
      {/* <ProgressBar /> */}
      {/* <OtpInput /> */}
      {/* <NestedCheckboxes /> */}
      {/* <ChipsInput /> */}
      {/* <ToDoList /> */}
      {/* <Accordion /> */}
      {/* <GoogleSheet /> */}
      {/* <StarRating /> */}
      {/* <ToastContainer /> */}
      {/* <Carousel /> */}
      {/* <CountDownTimer /> */}
      {/* <InteractiveGrid /> */}
      <TicTacToe size={5} />
    </>
  );
}

export default App;
