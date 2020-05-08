import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectItem from './ProjectItem';


export default function ProjectList(props) {
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/projects')
    .then(res => {
      console.log(res);
      setProjects(res.data);
    })
    .catch(err => {
      console.log({err});
    })

  },[])


  return (
    <div>
      <h2>Projects</h2>
      <ol>
        {projects.map(item => <ProjectItem key={item.id} project={item} />)}
      </ol>
    </div>
  )
}