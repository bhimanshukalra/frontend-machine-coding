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
      <ToDoList />
    </>
  );
}

export default App;
