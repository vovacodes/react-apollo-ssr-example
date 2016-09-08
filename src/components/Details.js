import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Details extends React.Component {

  render() {
    const { errors, loading, subreddit } = this.props.data;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div>
          <a href={`https://www.reddit.com/r/${subreddit.name}`}><h2>{subreddit.title}</h2></a>
          <div>{subreddit.publicDescription}</div>
        </div>
    );
  }

}

export default graphql(
    gql`
      query fetchSubreddit($id: String!) {
        subreddit(name: $id) {
          name
          title
          publicDescription
        }
      }
    `,
    {
      options: (ownProps) => ({
        variables: {
          id: ownProps.params.id
        }
      })
    }
)(Details)
