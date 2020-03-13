import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import ProjectList from "./components/ProjectList";
import Project from "./components/Project";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={props => <ProjectList {...props} />} />
        <Route path="/:id/actions" render={props => <Project {...props} />} />
      </div>
    </Router>
  );
}

export default App;