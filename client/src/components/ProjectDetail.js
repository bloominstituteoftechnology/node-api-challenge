import React, { useState, useEffect } from 'react';
import Actions from './Actions';
import axios from 'axios';

const ProjectDetail = props => {
  const [detail, setDetail] = useState({});
  console.log(props.location.id);

  useEffect(() => {
    axios
      .get(`http://localhost:9999/api/projects/${props.location.id}`)
      .then(res => {
        console.log(res.data);
        setDetail(res.data);
      })
      .catch(err => console.log(err));
  }, [setDetail, props.location.id]);

  console.log(detail.actions);
  return (
    <div>
      <h2>Project Detail</h2>
      <div>Project: {detail.name}</div>

      {detail.actions.map(action => (
        <Actions action={action} />
      ))}
    </div>
  );
};

export default ProjectDetail;
