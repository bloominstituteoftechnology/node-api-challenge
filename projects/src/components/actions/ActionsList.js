import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../Navigation';
import { Card, Icon} from 'semantic-ui-react';
import ActionCard from './ActionCard';
import { useHistory } from 'react-router-dom'
import Footer from '../Footer';

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
    e.preventDefault()
    history.push(`/api/addaction`)
  }
  return (
    <div>
      <Navigation/>
      <h1>Action List</h1>
      <Icon name="add circle" size="large" alternate outline color="blue" onClick={e => routeToAddAction(e)}/>
      <div className="cards-wrapper">
        <Card.Group>
          {actionsList.map((action) => (
            <ActionCard action={action} key={action.id}/>
          ))}
        </Card.Group>
      </div>
      <Footer/>
    </div>
  );
};
export default ActionsList;

