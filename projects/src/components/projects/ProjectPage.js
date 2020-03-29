import React, { useState, useEffect } from 'react';
import { Button, Card, Image, Icon } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';
import Navigation from '../Navigation';
import Footer from '../Footer';
 const initialState = {
   id:"",
   name:"",
   description:"", 
   completed:true,
   actions:[
     {
       id:"",
       project_id:"",
       description:"",
       notes:"",
       completed:false
     }
   ]

 }
const ProjectPage = () => {
    const [project, setProject] = useState(initialState);

    const { id } = useParams();
    const history = useHistory();
 
useEffect(() => {
        axios
          .get(`https://node-app-sprint.herokuapp.com/api/projects/${id}`)
          .then((response) => {
            console.log("hereeee", response.data.actions)
            setProject(response.data)
          })
          .catch((err) => (err));
      }, [id]);

const deleteProject = id => {
    axios
      .delete(`https://node-app-sprint.herokuapp.com/api/projects/${id}`)
      .then((res) => {
        history.push('/api/projects')
          (res)
        })
      .catch((err) => (err));
  };

  const routeToProjectEdit = (e, project) => {
    e.preventDefault()
    history.push(`/edit/${project.id}`)
  }
  const routeToAddAction = e => {
    e.preventDefault()
    history.push(`/api/addaction`)
  }
  
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
                {/* <Card.Description>
                Description: {project.actions.map((action)=>(
                  <h1>{action.notes}</h1>
                ))}
                </Card.Description> */}
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button  
                    basic color='red' 
                    onClick={() => deleteProject(id)}
                    >
                  Delete 
                    <Icon name="trash" alternate outline/>
                  </Button>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button  
                    basic color='green' 
                    onClick={e => routeToProjectEdit(e, project)} key={project.id}
                    >
                  Edit  
                    <Icon name="edit" alternate outline/>
                  </Button>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button  
                    basic color='green' 
                    onClick={routeToAddAction}
                    >
                 Add Action
                    <Icon name="add" alternate outline/>
                  </Button>
                </div>
              </Card.Content>
            </Card>
      </div>
      <Footer/>
    </div>
)};

export default ProjectPage;