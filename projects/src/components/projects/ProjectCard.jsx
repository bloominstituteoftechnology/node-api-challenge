/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const history = useHistory();

  const routeToProject = (e) => {
    e.preventDefault();
    history.push(`projects/${project.id}`);
  };

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="small"
          src="https://images.unsplash.com/photo-1416339684178-3a239570f315?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80"
        />
        <Card.Header>{project.name}</Card.Header>
        <Card.Meta>{project.id}</Card.Meta>
        <Card.Description>
          {project.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button onClick={routeToProject} basic color="green"> View project </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
export default ProjectCard;
