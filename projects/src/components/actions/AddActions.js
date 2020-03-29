import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
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

export const AddActions = () => {
  const [newAction, setNewAction] = useState(initialState);
  const history = useHistory()
  const { id } = useParams()

  const handleChangesAdd = (e) => {
    setNewAction({
      ...newAction,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(`https://node-app-sprint.herokuapp.com/api/projects/${id}/action`, newAction)
      .then((res) => { 
        setNewAction('')
      history.push(`actions/`)
    })
      .catch((err) => (err));
  };
  return (
   <div>
     <Navigation/>
     <h1>Add new Action to a project</h1>
     <div className="addActionForm">
     <Form 
     onSubmit={handleAdd}
     >
    <Form.Input
          required
          label="Note"
          type="text"
          name="notes"
          placeholder='Notes' 
          onChange={handleChangesAdd}/>
    <Form.TextArea
         required
          label='Description' 
          name="description"
          placeholder='Description' 
          onChange={handleChangesAdd} />
    <Button type='submit'>Add new Action</Button>
  </Form>
  </div>
  <Footer/>
   </div>
  );
};

