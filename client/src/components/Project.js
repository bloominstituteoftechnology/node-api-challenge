import React from 'react';
import { Link } from 'react-router-dom';

const Project = ({ project }) => {
  const clickHandler = e => {
    console.log('clicked');
  };

  return (
    <Link to={{ pathname: '/projectdetail', id: project.id }} style={{ textDecoration: 'none', color: 'black' }} onClick={clickHandler}>
      <div>Name: {project.name}</div>
      <div>Description: {project.description}</div>
      <div>Completed: {`${project.completed}`}</div>
    </Link>
  );
};

export default Project;
