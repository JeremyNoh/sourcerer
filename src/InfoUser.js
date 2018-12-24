import React, { Component } from "react";

import "./App.css";
import { Pane, Badge, Avatar } from "evergreen-ui";

class InfoUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Pane background="#282c34" padding={24} width="100%">
          <Pane display="flex" alignItems="center" justifyContent="center">
            <h1>{this.props.user.nickname}</h1>
          </Pane>
          <Pane display="flex" alignItems="center" justifyContent="center">
            <Badge color="neutral" isSolid marginRight={8}>
              {this.props.user.followers} followers
            </Badge>
            <Badge color="neutral" isSolid marginRight={8}>
              {this.props.user.following} following
            </Badge>
          </Pane>
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding={10}
          >
            <Avatar
              src={this.props.user.avatarUrl}
              name={this.props.user.nickname}
              size={70}
            />
          </Pane>
        </Pane>
      </>
    );
  }
}

export default InfoUser;
