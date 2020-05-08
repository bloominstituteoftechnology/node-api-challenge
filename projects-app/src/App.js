import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  console.log(projects);

  useEffect(async () => {
    const result = await axios("http://localhost:4000/api/project/");

    setProjects(result.data);
  }, []);

  return (
    <div>
      <h1>FIRST PROJECT THAT FETCHED DATA FROM SERVER ITSELF</h1>

      {projects.map((project) => {
        return (
          <div className="App">
            <h2>Project: {project.name}</h2>
            <p>Description: {project.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
