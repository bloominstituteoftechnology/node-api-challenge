import React from 'react';

const Actions = ({ action }) => {
  console.log(action);
  return (
    <div>
      <div>Description: {action.description}</div>
      <div>Notes: {action.notes}</div>
      <div>Completed: {`${action.completed}`}</div>
    </div>
  );
}

export default Actions;
