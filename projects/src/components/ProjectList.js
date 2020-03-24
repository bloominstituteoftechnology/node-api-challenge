import React, { useState, useEffect } from 'react';
import {
  CardColumns,
  Card,
  CardTitle,
  CardText,
  CardBody,
  Button,
} from 'reactstrap';

import axios from 'axios';
import AddProject from './AddProject';

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

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:4000/api/projects/${id}`)
      .then((res) => (res))
      .catch((err) => (err));
  };
  return (
    <div>
      <AddProject projectList={projectList} setProjectList={setProjectList} />
      <div className="cards-wrapper">
        <CardColumns>
          {projectList.map((project) => (
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
                <Button onClick={() => deleteUser(project.id)}>Delete</Button>
                <Button>View project</Button>
              </CardBody>
            </Card>
          ))}
        </CardColumns>
      </div>
    </div>
  );
};
export default ProjectList;