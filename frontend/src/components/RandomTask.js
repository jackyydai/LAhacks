import '../styles/Task.css';
import React, { useState } from "react";


const TaskComp = (props) => {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = (scrollType) => () => {
    setOpen(prevOpen => !prevOpen);
    // console.log("toggling");
  };

  const handleClose = () => {
    setOpen(false);
    // console.log("closing");
  };

  async function removeTask() {
    console.log("remove task")
    var DBF_username = localStorage.getItem("DBF_username");
    const tasknum = props.tasknum;
    const edit = {username: DBF_username, tasknum};
    console.log(JSON.stringify(edit))

    await fetch("http://localhost:4000/task/remove", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(edit),
      })
      .catch(error => {
          window.alert(error);
          return;
     });
     window.location.reload();
    // Code to be executed when the element is clicked
  }

  async function addpoints()
  {
    var DBF_username = localStorage.getItem("DBF_username");
    const points = 2;
    const edit = {username: DBF_username, points};
    console.log(JSON.stringify(edit))

    await fetch("http://localhost:4000/points/add", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(edit),
      })
      .catch(error => {
          window.alert(error);
          return;
     });

    removeTask()
  }

  return (
    <div className="task" onClick={handleClickOpen()}>
      {!open && (<div className="container">
        <div className='title'>{props.name}</div>
        <div className='date'>DUE: {props.time}</div>
      </div>)}
      {open && (
        <div className="container" onClick={handleClose}>
          <button 
            type="submit" 
            id="button"
            onClick= {addpoints}
            ><b>Mark Done.</b></button>
            <button 
            type="submit" 
            id="button"
            onClick= {removeTask}
            ><b>Trash.</b></button>
        </div>
      )}
    </div>
  );
}
  
export default TaskComp;