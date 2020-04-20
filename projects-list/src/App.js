import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import ProjectList from "./components/ProjectList";
import Projects from "./components/Projects";
import Landing from "./components/Landing";

function App() {
  const [projects, setProjects] = useState([]);
  const [actions, setActions] = useState([]);
  const getProjects = () => {
    axios
      .get("http://localhost:5000/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err, "could not retrieve project data");
      });
  };
  const getActions = () => {
    axios
      .get("http://localhost:5000/actions")
      .then((res) => {
        setActions(res.data);
      })
      .catch((err) => {
        console.log(err, "could not retrieve project data");
      });
  };
  console.log(projects);

  useEffect(() => {
    getProjects();
    getActions();
  }, []);

  return (
    <Router>
      <div className="App">
        <Landing />
        <Switch>
          <Route
            exact
            path="/projects/:id"
            render={(props) => <Projects {...props} projects={projects} actions = {actions}/>}
          />
          <Route
            exact
            path="/projects"
            render={(props) => <ProjectList {...props} projects={projects} />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
