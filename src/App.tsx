import { useEffect, useState } from "react";
import "./App.css";
import { AutoCompleteSearchBar } from "./AutoCompleteSearchBar/AutoCompleteSearchBar";
import FileExplorer from "./FileExplorer/FileExplorer";
import Pagination from "./Pagination/Pagination";
import ProgressBar from "./ProgressBar/ProgressBar";
import { TabForm } from "./TabForm/TabForm";
import OtpInput from "./OtpInput/OtpInput";

function App() {
  return (
    <>
      {/* <AutoCompleteSearchBar /> */}
      {/* <TabForm /> */}
      {/* <Pagination /> */}
      {/* <FileExplorer /> */}
      {/* <ProgressBar /> */}
      <OtpInput />
    </>
  );
}

export default App;
