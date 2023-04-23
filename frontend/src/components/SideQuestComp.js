import { useState } from 'react';
import '../styles/Task.css';

export default function SideQuestConmp() {
    const [sideQuest, setSideQuest] = useState([""]);

    async function generate() {
        console.log("generated")
        const response = await fetch(`http://localhost:4000/getRandTask`, {
            method: 'GET',
            mode:'no-cors',
            headers: {
                'Accept': 'application/json',
            },
        }) 
        console.log(response)
    }
    
    return (
      <div className="task">
          <p></p>
          <button onClick={generate}>CLICK ME</button>
      </div>
    );
}
  
  
