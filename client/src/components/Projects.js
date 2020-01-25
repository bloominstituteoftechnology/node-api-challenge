import React, { useState, useEffect } from 'react';
import Project from './Project';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9999/api/projects')
      .then(res => {
        console.log('Projects res', res.data);
        setProjects(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      {projects.map(project => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
