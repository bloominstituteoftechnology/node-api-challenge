import React, { useState } from 'react';
import {
  Label,
  Row,
  Col,
  Form,
  Input,
  Button,
  FormGroup,
  Container,
} from 'reactstrap';

import axios from 'axios';
import Navigation from './Navigation';

const AddProject = () => {
  const [newProject, setNewProject] = useState('');

  const handleChangesAdd = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/api/projects/`, newProject)
      .then((res) => (res))
      .catch((err) => (err));
  };
  return (
   <div>
     <Navigation/>
     <Container>
      <Row>
        <Col xs="12" md={{ size: 8, offset: 3 }}>
          <Form onSubmit={handleAdd}>
            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
              <Label for="name">Name</Label>
              <Input
                required
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChangesAdd}
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
              <Label for="content">Description</Label>
              <Input
              required
                type="textarea"
                name="description"
                placeholder="Description"
                onChange={handleChangesAdd}
              />
            </FormGroup>
            <Button style={{ display: 'flex', alignItems: 'center' }}>Add new Project</Button>

          </Form>
        </Col>
      </Row>
    </Container>
   </div>
  );
};
export default AddProject;