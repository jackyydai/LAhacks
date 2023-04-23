import React from "react";
import Task from "../components/TaskComp"
import Addtask from "../components/AddTask"
import '../styles/Home.css';



async function getInformation() {
    var DBF_username = localStorage.getItem("DBF_username");
    if(DBF_username == null) {
        // this should NEVER happen
        DBF_username = "chang";
    }
    try {
        const response = await fetch(`http://localhost:4000/task/get/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username" : DBF_username}),
        });
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Error:', error);
    }
}

async function getPoints() {
    var DBF_username = localStorage.getItem("DBF_username");
    if(DBF_username == null) {
        // this should NEVER happen
        DBF_username = "chang";
    }
    try {
        const response = await fetch(`http://localhost:4000/points/get/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username" : DBF_username}),
        });
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Error:', error);
    }
}

class HomeScreen extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            tasks: new Array(5).fill(null),
            points: 0,
        }
        this.firstTime = false;
        this.initCalendar();
    }

    async initCalendar() {
        var newState = await getInformation();

        // var curPoints = await getPoints();
        
        if(newState == null) {
            this.firstTime = true;
            return;
        }
        
        // newState = newState.state;
        console.log(newState.points);
        this.setState({
            tasks: newState.tasks,
            points: newState.points,
            },
            () => {
                console.log(this.state);
            });
    }

    handleRandom() {
        var DBF_username = localStorage.getItem("DBF_username");
        const newPerson = {username: DBF_username, task: {name : "Touch Grass", number: "23:59"}};
        console.log(JSON.stringify(newPerson))
        fetch("http://localhost:4000/task/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        ;
       
        window.location.reload();
    }

    render() {
        const nameArray = new Array(5);
        const timeArray = new Array(5);
        for (let i = 0; i < 5; i++) {
            if(this.state.tasks[i] &&this.state.tasks[i].name)
            {
                nameArray[i] = this.state.tasks[i].name
                timeArray[i] = this.state.tasks[i].number
            }
        }
        const canAddTask = this.state.tasks.length< 5; 
        return (
            <div>
             <div>
                {/* <a href="./sidequest"> */}
                 <h2 >S I D E Q U E S T</h2>
                {/* </a> */}
             </div>
             <div className="tasks">
                {Array.from(Array(this.state.tasks.length)).map((_, index) => (        
                    <Task
                    name = {nameArray[index]}
                    tasknum = {index}
                    time = {timeArray[index]}
                    ></Task>
                ))}
                    {/* <Task
                    name = {"side quest"}
                    tasknum = {1}
                    time = {1234}
                    ></Task> */}
                {canAddTask && (<div  className="addtask"> 
                    <Addtask></Addtask>
                </div>)}
             </div>
             <div className="points">
                You have {this.state.points} points!
             </div>

            <button 
            type="submit" 
            id="button"
            onClick={this.handleRandom}
            ><b>Get Side Quest?</b>
            </button>

         </div>
        );
    }

}
export default HomeScreen;