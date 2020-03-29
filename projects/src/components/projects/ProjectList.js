import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../Navigation';
import { Card} from 'semantic-ui-react';
import ProjectCard from './ProjectCard';
import Footer from '../Footer';

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
 
  useEffect(() => {
    axios
      .get(`https://node-app-sprint.herokuapp.com/api/projects/`)
      .then((response) => {
        setProjectList(response.data)
      })
      .catch((err) => (err));
  }, []);
  
  return (
    <div>
      <Navigation/>
      <h1>Projects List</h1>
      <div className="cards-wrapper">
        <Card.Group>
          {projectList.map((project) => (
            <ProjectCard project={project} key={project.id}/>
          ))}
        </Card.Group>
      </div>
      <Footer/>
    </div>
  );
};
export default ProjectList;

