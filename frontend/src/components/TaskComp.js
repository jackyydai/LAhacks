import '../styles/Task.css';
import React, { useState } from "react";

const TaskComp = (props) => {
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
    <div className="task" onClick={handleClickOpen()}>
      {!open && (<div className="container">
        <div>do homework</div>
        <div>do homework</div>
      </div>)}
      {open && (
        <div className="container" onClick={handleClose}>
          <button 
            type="submit" 
            id="button"
            ><b>Mark Done.</b></button>
            <button 
            type="submit" 
            id="button"
            ><b>Trash.</b></button>
        </div>
      )}
    </div>
  );
}
  
export default TaskComp;