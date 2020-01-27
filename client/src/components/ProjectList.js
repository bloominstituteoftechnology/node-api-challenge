import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ProjectListStyle } from "../styles/styles";
import { axiosProjectCall } from "../axiosCall";

import ProjectCard from "./ProjectCard";

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }
  componentDidMount() {
    axiosProjectCall()
      .get("/")
      .then(projects => {
        this.setState({
          projects: projects.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <ProjectListStyle>
        {/* {this.state.projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))} */}

        {this.state.projects.map(project => (
          <Link key={project.id} to={`/${project.id}`}>
            <ProjectCard key={project.id} project={project} />
          </Link>
        ))}
      </ProjectListStyle>
    );
  }
}
