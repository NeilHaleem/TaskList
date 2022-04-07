import React, { Fragment } from "react";
import "./App.css";

//components

import InputTask from "./components/InputTask.js";
import ListTasks from "./components/ListTask";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTask />
        <br></br>
        <ListTasks />
      </div>
    </Fragment>
  );
}

export default App;