/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const ActionCard = ({ action }) => {
// console.log("action", action);
//  console.log(action.id, 'action in action card');
  const history = useHistory();

  const routeToAction = (e) => {
    e.preventDefault();
    history.push(`actions/${action.id}`);
  };

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="small"
          src="https://images.unsplash.com/photo-1416339684178-3a239570f315?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80"
        />
        <Card.Header>
          {' '}
          Notes:
          {action.notes}
        </Card.Header>
        <Card.Meta>
          Project id:
          {action.project_id}
        </Card.Meta>
        <Card.Meta>
          Action id:
          {action.id}
        </Card.Meta>
        <Card.Description>
          Description:
          {' '}
          {action.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button onClick={routeToAction} basic color="green">
            View action
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
export default ActionCard;
