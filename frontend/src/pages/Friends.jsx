import logo from '../logo.svg';
import Post from "./Post.jsx"
import '../styles/Friends.css';
import TaskComp from '../components/TaskComp';
import React from "react";

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


class Friends extends React.Component
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

  render() { 
    return(
    <div className="App">
    <header>
      <h1>S I D E Q U E S T</h1>
      <p>what are your fellow quest-ers up to?</p>
    </header>
    <div className='posts'>
    <Post
          name = {localStorage.getItem("DBF_username")}
          point =  {this.state.points}
     ></Post>
    <Post
          name = {"Bob"}
          point =  {"15"}
     ></Post>
     <Post
          name = {"David"}
          point =  {"13"}
     ></Post>
     <Post
          name = {"Max"}
          point =  {"8"}
     ></Post>
     <Post
          name = {"George"}
          point =  {"2"}
     ></Post>
    </div>
    <div></div>
  </div>
    )
  }
}

export default Friends;