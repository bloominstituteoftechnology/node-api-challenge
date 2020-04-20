import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function Projects(props) {
  const id = props.projects.find(
    (project) => `${project.id}` === props.match.params.id
  );
  const actions = props.actions.filter(
    (action) => `${action.project_id}` === props.match.params.id
  );
  console.log(id);
  console.log(actions);
  console.log(props.actions);
  return (
    <div> 
      <h1>project name: {id.name}</h1>
      <p> description: {id.description}</p>
      <h1>Actions:</h1>
      {actions.map((action) => {
        return (
          <div>
              
            <p>{action.description}</p>
            <p>{action.notes}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Projects;
