import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Icon} from 'semantic-ui-react';
import axios from 'axios';
import ActionCard from './ActionCard';

const ActionsList = () => {
  const [actionsList, setActionList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://node-app-sprint.herokuapp.com/api/actions/`)
      .then((response) => {
        setActionList(response.data)
      })
      .catch((err) => (err));
  }, []);

  const routeToAddAction = (e) => {
    e.preventDefault();
    history.push(`/api/addaction`)
  };

  return (
    <div>
      <h1>Action List</h1>
      <Icon name="add circle" size="large" alternate outline color="blue" onClick={e => routeToAddAction(e)}/>
      <div className="cards-wrapper">
        <Card.Group>
          {actionsList.map((action) => (
            <ActionCard action={action} key={action.id}/>
          ))}
        </Card.Group>
      </div>
    </div>
  );
};
export default ActionsList;
