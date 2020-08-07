import React, { useState, useEffect } from 'react';

import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";

const App = () =>
{
  const [ projects, setProjects ] = useState( [] );
  useEffect( () =>
  {
    axios.get( "http://localhost:5000/api/projects" )
      .then( response => setProjects( response.data.data ) )
      .catch( error => console.log( error ) );
  }, [] );
  
  return (
    <div className="App">
      <h1>Projects</h1>
      { projects.map( project => 
          <div key = { project.id } class="row">
            <div class="col s12 m6">
              <div class="card deep-purple darken-3">
                <div class="card-content white-text card-action">
                  <span class="card-title"> { project.name } </span>
                  <p> { project.description } </p>
                </div>
              </div>
            </div>
          </div>
        ) 
      }
    </div>
  );
}
export default App;