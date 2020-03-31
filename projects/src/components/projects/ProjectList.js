import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
 
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects/`)
      .then((response) => {
        setProjectList(response.data)
      })
      .catch((err) => (err));
  }, []);
  
  return (
    <div>
      <h1>Projects List</h1>
      <div className="cards-wrapper">
        <Card.Group>
          {projectList.map((project) => (
            <ProjectCard project={project} key={project.id}/>
          ))}
        </Card.Group>
      </div>
    </div>
  );
};

export default ProjectList;
