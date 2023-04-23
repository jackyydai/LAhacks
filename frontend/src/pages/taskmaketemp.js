import React, { useState } from "react";
import { useNavigate } from "react-router";

// import '../styles/LogIn.css';

const SignUpScreen = () => {
    const [form, setForm] = useState({
        name: "",
        number: "",
      });
      const navigate = useNavigate();
  
      function updateForm(value) {
          return setForm((prev) => {
            return { ...prev, ...value };
          });
        }
  
      async function onSubmit(e) {
      e.preventDefault();

    //   name blank string prevention
      if(form.name == "") {
        alert("Please input a name. —  S I D E Q U E S T");
        return;
      }

      //number blank string prevention
      if(form.number == "") {
        alert("Please input a number. — S I D E Q U E S T");
        return;
      }
      var DBF_username = localStorage.getItem("DBF_username");
      var p1 = form.number;
      const newPerson = {username: DBF_username, task: {name : form.name, number: p1}};
      console.log(JSON.stringify(newPerson))
      await fetch("http://localhost:4000/task/add", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
      })
      .catch(error => {
          window.alert(error);
          return;
      });

    //   creates an empty profile so the database doesn't implode on itself.
      const newTask = 
      {
        name: form.name, 
        friends: new Array(),
      }
      
      

      localStorage.setItem("SQ_name", form.name);
    //   localStorage.setItem("_id", dataBase_id);
      

      setForm({ name: "", number: ""});

     // navigate("/"); //TODO: change to editprofile
     // window.location.reload(); // this is so navbar fixes itself
      }

    return (
        <body>
        <div>
            <div className="title">S I D E Q U E S T.
                <div className="login-text">make task</div>
            </div>
            <form onSubmit={onSubmit}>
                <input
                 className= "input-bar" 
                 type="text" 
                 name="name" 
                 placeholder="taskname." 
                 value={form.name}
                 onChange={(e) => updateForm({ name: e.target.value })}
                 />
                <div>
                    <input
                     className= "input-bar" 
                     name="number" 
                     placeholder="number."
                     value={form.number}
                     onChange={(e) => updateForm({ number: e.target.value })}
                     />
                </div>
                <input className="button" type="submit" value="Submit."></input>
            </form>

        </div>
        </body>
    )
}

export default SignUpScreen;