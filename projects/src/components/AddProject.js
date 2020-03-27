import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';
import Navigation from './Navigation';

const AddProject = () => {
  const [newProject, setNewProject] = useState('');
  const history = useHistory()
  const { id } = useParams()

  const handleChangesAdd = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(`https://node-app-sprint.herokuapp.com/api/projects/`, newProject)
      .then((res) => { 
        setNewProject('')
      history.push(`projects/`)
    })
      .catch((err) => (err));
  };
  return (
   <div>
     <Navigation/>
     <div className="addProjectForm">
     <Form onSubmit={handleAdd}>
    <Form.Input
          required
          label="Name"
          type="text"
          name="name"
          placeholder='Name' 
          onChange={handleChangesAdd}/>
    <Form.TextArea
         required
          label='Description' 
          name="description"
          placeholder='Description' 
          onChange={handleChangesAdd} />
    <Button type='submit'>Add new Project</Button>
  </Form>
  </div>
   </div>
  );
};
export default AddProject;
