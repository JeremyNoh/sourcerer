import React, { Component } from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import "./App.css";

import myclient from "./client";
import Repositories from "./Repositories";
import InfoUser from "./InfoUser";

const createInfoUser = data => {
  let user = {};
  const {
    avatarUrl,
    bio,
    email,
    url,
    login,
    followers,
    following
  } = data.viewer;

  user.repositoryCount = data.search.repositoryCount;
  user.avatarUrl = avatarUrl;
  user.bio = bio;
  user.email = email;
  user.url = url;
  user.nickname = login;
  user.following = following.totalCount;
  user.followers = followers.totalCount;

  return user;
};

class RecupInfoUser extends Component {
  majUser = data => {
    const user = createInfoUser(data);
    this.props.getUser(user);
  };

  render() {
    return (
      <Query query={myclient.getInfo}>
        {({ loading, error, data }) => {
          if (loading) {
            return <span>WAIT</span>;
          }
          this.majUser(data);
          return <></>;
        }}
      </Query>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined };
  }

  getUser = user => {
    if (!this.state.user) {
      this.setState({ user, isloading: true });
    }
  };

  render() {
    return (
      <ApolloProvider client={myclient.client}>
        <div className="AppContent">
          <RecupInfoUser getUser={this.getUser} />
          {this.state.isloading && <InfoUser user={this.state.user} />}
          {this.state.isloading && (
            <Repositories repositoryCount={this.state.user.repositoryCount} />
          )}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
