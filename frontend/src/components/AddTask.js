import '../styles/Task.css';
import React, { useState } from "react";
import Maketask from "../pages/taskmaketemp"

const AddTask = (props) => {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = (scrollType) => () => {
    setOpen(prevOpen => !prevOpen);
    console.log("toggling");
  };

  const handleClose = () => {
    setOpen(false);
    console.log("closing");
  };

  return (
    <div className="addtask" onClick={handleClickOpen()}>
      {!open && (<div className="container">
      </div>)}
      {open && (
        <div className="container" onClick={handleClose}>
            <Maketask></Maketask>
        </div>
      )}
    </div>
  );
}
  
export default AddTask;