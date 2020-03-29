import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';
import Navigation from '../Navigation';

const EditAction = () => {
  const [updatedAction, setUpdatedAction] = useState('');
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`https://node-app-sprint.herokuapp.com/api/actions/${id}`)
      .then((response) => {
        setUpdatedAction(response.data)
      })
      .catch((err) => (err));
  }, [id]);

  const handleChangesAdd = (e) => {
    setUpdatedAction({
      ...updatedAction,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const dataToSend = {
        name: updatedAction.name,
        description: updatedAction.description,
      };
    axios
      .put(`https://node-app-sprint.herokuapp.com/api/actions/${id}`, dataToSend)
      .then((res) => { 
        setUpdatedAction('')
      history.push(`actions/`)
    })
      .catch((err) => (err));
  };
  return (
   <div>
     <Navigation/>
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
          onChange={handleChangesAdd}
          value={updatedAction.notes}
          />
    <Form.TextArea
         required
          label='Description' 
          name="description"
          placeholder='Description' 
          onChange={handleChangesAdd} 
          value={updatedAction.description}
          />
    <Button type='submit'> Update Action</Button>
  </Form>
  </div>
   </div>
  );
};
export default EditAction;
