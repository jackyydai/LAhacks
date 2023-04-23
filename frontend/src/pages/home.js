import React from "react";
import Task from "../components/TaskComp"
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

class HomeScreen extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            tasks: new Array(5).fill(null),
        }
        this.firstTime = false;
        this.initCalendar();
    }

    async initCalendar() {
        var newState = await getInformation();
        
        if(newState == null) {
            this.firstTime = true;
            return;
        }
        
        // newState = newState.state;
        console.log(newState);
        this.setState({
            tasks: newState,
            },
            () => {
                console.log(this.state);
            });
    }

    render() {

        return (
            <div>
             <div>
                 <h2>S I D E Q U E S T</h2>
             </div>
             <div className="tasks">
                {Array.from(Array(5)).map((_, index) => (        
                    <Task></Task>
                ))}
             </div>
         </div>
        );
    }

}
export default HomeScreen;