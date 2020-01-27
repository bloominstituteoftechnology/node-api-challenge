import React, { Component } from "react";

import { ActionListStyle } from "../../styles/styles";
import { axiosProjectCall } from "../../axiosCall";

export default class ActionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      actions: []
    };
    console.log("id:", this.props);
  }

  componentDidMount() {
    axiosProjectCall()
      .get(`/${this.state.id}/actions`)
      .then(res => {
        console.log("actions: ", res);
        this.setState({
          actions: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return <ActionListStyle>action list</ActionListStyle>;
  }
}
