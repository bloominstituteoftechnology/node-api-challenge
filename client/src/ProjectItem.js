import React, { useState, useEffect } from 'react'



export default function ProjectItem(props) {
  // const [project, setProject] = useState();


  return (
    <li>
      <h4>{props.project.name}</h4>
      <p>{props.project.description}</p>
      <div>completed: {props.project.completed ? "YES": "no"}</div>
    </li>
  )
}