import React, { useState, useEffect } from 'react';
// import {
//   CardColumns,
//   Card,
//   CardTitle,
//   CardText,
//   CardBody,
//   Button,
// } from 'reactstrap';
import { Button, Card, Image, Icon } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'

import axios from 'axios';
import Navigation from './Navigation';

const ProjectPage = () => {
    const [project, setProject] = useState({});
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        axios
          .get(`http://localhost:4000/api/projects/${id}`)
          .then((response) => {
            setProject(response.data)
          })
          .catch((err) => (err));
      }, [id]);

const deleteUser = (id) => {
    axios
      .delete(`http://localhost:4000/api/projects/${id}`)
      .then((res) => {
        history.push('/api/projects')
          (res)
        })
      .catch((err) => (err));
  };
return (
         <div>
      <Navigation/>
      <div className="cards-wrapper">

      <Card>
              <Card.Content>
                <Image
                  floated='right'
                  size='mini'
                  src='https://images.unsplash.com/photo-1416339684178-3a239570f315?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80'
                />
                <Card.Header>Name: {project.name}</Card.Header>
                <Card.Meta>ID: {project.id}</Card.Meta>
                <Card.Description>
                Description: {project.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button  href ="/api/projectpage" basic color='red' onClick={() => deleteUser(project.id)}>
                  Delete <Icon name="trash" alternate outline/>
                  </Button>
                </div>
              </Card.Content>
            </Card>

        {/* <CardColumns>
            <Card key={project.id}>
              <CardBody>
                <CardTitle>
                  Name:
                  {project.name}
                </CardTitle>
                <CardText>
                  Id:
                  {project.id}
                </CardText>
                <CardText>
                  Description:
                  {project.description}
                </CardText>
                <Button 
                  onClick={() => deleteUser(project.id)}
                  color="info"
                  style ={{ alignItems: 'center' }}
                >
                  Delete 
                <i className="material-icons">delete</i>
                  </Button>
                
              </CardBody>
            </Card>
        </CardColumns> */}
      </div>
    </div>
)


};
export default ProjectPage;