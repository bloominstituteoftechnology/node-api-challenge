import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Project from './components/project';
import axios from 'axios';

function App() {


  const [projects, setProjects]= useState([]);
  const [actions, setActions]= useState([]);


  useEffect(()=> {
    axios.get('http://localhost:4000/api/projects/1')
    .then(res=> setProjects(res.data))
    .catch(err=> console.log(err))


    axios.get('http://localhost:4000/api/projects/1/actions')
    .then(res=> setActions(res.data))
    .catch(err=> console.log(err))
  }, [])

   console.log(projects.actions)
   console.log("ACTIONS", actions)
   return (
    <div className="App">
      <header className="App-header">
       <h1>Projects</h1>

       <div>
       <h2>{projects.name}</h2>
        <h3>{projects.description}</h3>
        <p>{actions.map(a=> {
          return (
             <h3>{a.description}</h3>

          )
        })}</p>
        

       </div>
        
        
      </header>
    </div>
  );
}

export default App;
