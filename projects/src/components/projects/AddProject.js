import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Navigation from '../Navigation';
import Footer from '../Footer';

const AddProject = () => {
  const [newProject, setNewProject] = useState('');
  const history = useHistory()

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
     <h1>Add a new project</h1>
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
  <Footer/>
   </div>
  );
};
export default AddProject;
