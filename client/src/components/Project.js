import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import { ProjectStyle, ProjectSubNavStyle } from "../styles/styles";
import { axiosProjectCall } from "../axiosCall";
import ProjectCard from "./ProjectCard";

import ActionList from "./actions/ActionList";

export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: [],
      id: this.props.match.params.id,
      isAction: false
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

  handleClick = e => {
    e.preventDefault();
    this.setState({
      isAction: !this.state.isAction
    });
  };
  render() {
    return (
      <ProjectStyle>
        <ProjectCard key={this.state.project.id} project={this.state.project} />
        <ProjectSubNavStyle>
          <Navbar>
            <Nav>
              <Nav.Item>Edit Project</Nav.Item>
              <Nav.Item>Delete Project</Nav.Item>
              <Nav.Item>
                {/* <Link to={`/project/${this.state.id}/actions`}>
                  View Project Actions
                </Link> */}

                {this.state.isAction ? (
                  <Link
                    onClick={this.handleClick}
                    to={`/project/${this.state.id}`}
                  >
                    Close Actions
                  </Link>
                ) : (
                  <Link
                    onClick={this.handleClick}
                    to={`/project/${this.state.id}/actions`}
                  >
                    View Project Actions
                  </Link>
                )}
              </Nav.Item>
            </Nav>
          </Navbar>
        </ProjectSubNavStyle>

        {/* <Route
          path={`/project/${this.state.id}/actions`}
          render={props => <ActionList {...props} id={this.state.id} />}
        /> */}

        {/* <Route
          path={`/project/${this.state.id}/actions`}
          render={props => <ActionList {...props} id={this.state.id} />}
        /> */}
      </ProjectStyle>
    );
  }
}
