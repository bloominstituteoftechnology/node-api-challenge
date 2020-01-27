import React, { Component } from "react";

import { ProjectStyle } from "../styles/styles";
import { axiosProjectCall } from "../axiosCall";
import ProjectCard from "./ProjectCard";

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: [],
      id: this.props.match.params.id
    };
  }

  componentDidMount() {
    axiosProjectCall()
      .get(`/${this.state.id}`)
      .then(res => {
        this.setState({
          project: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <ProjectStyle>
        <ProjectCard key={this.state.project.id} project={this.state.project} />
      </ProjectStyle>
    );
  }
}
