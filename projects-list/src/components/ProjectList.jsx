import React from "react";
import Projects from "./Projects";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function ProjectList({ projects }) {
  return (
    <div>
      {projects &&
        projects.map((project) => {
          return (
            <div>
              <div className="ui cards">
                <div className="ui card">
                  <div className="content">
                    <div className="header">{project.name}</div>
                    <div className="meta">{}</div>
                    <div className="description">{project.description}</div>
                    <Link to={`projects/${project.id}`}>
                <button>More info</button>
              </Link>
                  </div>
                </div>
              </div>{" "}
              
            </div>
          );
        })}
    </div>
  );
}

export default ProjectList;
