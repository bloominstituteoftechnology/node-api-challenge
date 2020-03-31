import React, { useState, useEffect } from 'react';
import { Button, Card, Image, Icon } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

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
 };

const ProjectPage = ({action}) => {
  const [project, setProject] = useState(initialState);
// console.log("project in projectpage", project)
 //console.log("project.action in projectpage",project.actions[3].project_id[2])
  const { id } = useParams();
  const history = useHistory();
 
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects/${id}`)
      .then((response) => {
      // console.log("hereeee", response.data)
        setProject(response.data)
      })
      .catch((err) => (err));
  }, [id]);

  const deleteProject = id => {
    axios
      .delete(`http://localhost:4000/api/projects/${id}`)
      .then((res) => {
        history.push('/api/projects')
          (res)
        })
      .catch((err) => (err));
  };

  const routeToProjectEdit = (e, project) => {
    e.preventDefault();
    history.push(`/edit/${project.id}`)
  };

  const routeToAddAction = e => {
    e.preventDefault();
    history.push(`/api/projects/${project.id}/actionadd`)
  };
  
  // it supposed to rediredt to the action page of the specific id
  const routeToAction = id => {
   // e.preventDefault()
    history.push(`/api/actions/${id}/`) //uses the project id not the action id
};
  
return (
    <div>
      <div className="cards-wrapper">
        <Card>
          <Card.Content>
            <Image
              floated='right'
              size='large'
              src='https://images.unsplash.com/photo-1416339684178-3a239570f315?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80'
            />
            <Card.Header>Name: {project.name}</Card.Header>
              <Card.Meta>ID: {project.id}</Card.Meta>
              <Card.Description>
              Description: {project.description}
              </Card.Description>
              <h4>Action notes</h4>
              <ol>
              {project.actions.map((item) =>(
                <Card.Description key={item.id}>
                  <li onClick={() =>routeToAction(id)} >{item.notes} id:{item.id} | PROJECT_ID {item.project_id}</li>
                </Card.Description>
              ))}
                </ol>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='red' onClick={() => deleteProject(id)}> Delete 
                <Icon name="trash" alternate outline/>
              </Button>
            </div>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={e => routeToProjectEdit(e, project)} key={project.id}> Edit  
                <Icon name="edit" alternate outline/>
              </Button>
            </div>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={routeToAddAction}> Add Action
                <Icon name="add" alternate outline/>
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  )
};

export default ProjectPage;
