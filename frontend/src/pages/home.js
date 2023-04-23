import React from "react";
import Task from "../components/TaskComp"
import '../styles/Home.css';
const HomeScreen = () => {
    return(
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
    )
}

export default HomeScreen;