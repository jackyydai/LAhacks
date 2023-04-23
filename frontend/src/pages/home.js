import React from "react";
import Task from "../components/TaskComp"
import '../styles/Home.css';

async function getInformation() {
    var DBF_username = localStorage.getItem("DBF_username");
    if(DBF_username == null) {
        // this should NEVER happen
        DBF_username = "chang";
    }
    const response = await fetch(`http://localhost:5000/tasks/get/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({"username" : DBF_username}),
    })

    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }
    
    const records = await response.json();
    return records
    // for(var record of records) {
    //     if(record.profileID === DBF_username) {
    //         return record;
    //     }
    // }
    // return null;
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
        newState = newState.state;
        this.setState({
            tasks: newState.tasks,
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
                 <Task></Task>
                 <Task></Task>
                 <Task></Task>
                 <Task></Task>
                 <Task></Task>
             </div>
         </div>
        );
    }

}
// export default Calender;
export default HomeScreen;