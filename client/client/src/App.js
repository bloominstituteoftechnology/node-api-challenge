import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';




function App() {

  const [projects, setProjects] = useState();

  useEffect(() => {
     axios
      .get('http://localhost:4000/projects')
        .then(res => {
          console.log(res.data)
          setProjects(res.data);
        })
        .catch(err =>{
          console.log(err)
        })
  }, [])

  console.log(projects);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {projects && projects.map(project =>(
          <div className="card">
            <h1>{project.name}</h1>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
