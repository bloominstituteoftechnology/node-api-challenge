import React, { useState, useEffect } from "react";
import axios from "axios";

function Project(props) {
  const [actions, setActions] = useState([]);

  const id = props.match.params.id;
  console.log(actions);
  console.log("props:", props);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/projects/${id}/actions`)
      .then(res => {
        setActions(res.data);
        console.log("actions", res.data);
      })
      .catch(err => console.log(err));
  }, [id]);


  return (
    <div>
      <h1>Project Actions</h1>
      {actions.map(action => (
        <div className="actions">
          <h3>{action.description} ({action.completed ? "completed" : "not completed"})</h3>
          
          <p>{action.notes}</p>
        </div>
      ))}
    </div>
  );
}


export default Project;