import React, { Component } from "react";

import { ActionListStyle } from "../../styles/styles";
import { axiosProjectCall } from "../../axiosCall";

import ActionCard from "./ActionCard";

export default class ActionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      actions: []
    };
  }

  componentDidMount() {
    axiosProjectCall()
      .get(`/${this.state.id}/actions`)
      .then(res => {
        this.setState({
          actions: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ActionListStyle>
        {this.state.actions.map(action => (
          <ActionCard key={action.id} action={action} />
        ))}
      </ActionListStyle>
    );
  }
}
