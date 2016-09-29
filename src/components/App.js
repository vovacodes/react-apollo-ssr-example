import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends React.Component {

  render() {
    const { loading, error, user } = this.props.data;

    if (loading) {
      return <div>Loading...</div>
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
        <div>
          <a href="/"><h1>Synth Music Subreddits followed by {user.username}</h1></a>
          {this.props.children}
        </div>
    );
  }

}

export default graphql(
    gql`
      query check {
        user(username: "wizardzloy") {
          username
        }
      }
    `
)(App);
