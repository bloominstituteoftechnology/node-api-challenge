import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import axios from 'axios';
import ActionCard from './ActionCard';

const ActionsList = () => {
  const [actionsList, setActionList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/actions`)
      .then((response) => {
        setActionList(response.data)
      })
      .catch((err) => (err));
  }, []);

  return (
    <div>
      <h1>Action List</h1>
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
