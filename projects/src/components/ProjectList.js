import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import AddProject from './AddProject';
import Navigation from './Navigation';
import { Button, Card, Image } from 'semantic-ui-react'

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

  // const deleteUser = (id) => {
  //   axios
  //     .delete(`http://localhost:4000/api/projects/${id}`)
  //     .then((res) => (res))
  //     .catch((err) => (err));
  // };
  return (
    <div>
      {/* <AddProject projectList={projectList} setProjectList={setProjectList} /> */}
      <Navigation/>
      <div className="cards-wrapper">
        <Card.Group>
          {projectList.map((project) => (
            <Card>
              <Card.Content>
                <Image
                  floated='right'
                  size='mini'
                  src='https://images.unsplash.com/photo-1416339684178-3a239570f315?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80'
                />
                <Card.Header>{project.name}</Card.Header>
                <Card.Meta>{project.id}</Card.Meta>
                <Card.Description>
                {project.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button href ="/api/projectpage" basic color='green'>
                  View project
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    </div>
  );
};
export default ProjectList;

