import React from 'react';
import { createFragment } from 'apollo-client';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const subredditInfoFragment = createFragment(gql`
  fragment subredditInfo on RedditSubreddit {
    name
    title
    publicDescription
  }
`);

const QUERY = gql`
  query {
    outrun: subreddit(name: "outrun") {
      ...subredditInfo
    }
    synthwave: subreddit(name: "synthwave") {
      ...subredditInfo
    }
    futuresynth: subreddit(name: "futuresynth") {
      ...subredditInfo
    }
  }
`;

class List extends React.Component {

  render() {
    const { errors, loading, outrun, synthwave, futuresynth } = this.props.data;

    if (loading) {
      return <div>Loading...</div>;
    }

    const listItems = [outrun, synthwave, futuresynth].map((subreddit) => (
        <li key={subreddit.title}><a href={`/details/${subreddit.name}`}>{subreddit.title}</a></li>
    ));

    return (
        <ul>
          {listItems}
        </ul>
    );
  }

}

export default graphql(QUERY, {
  options: () => ({
    fragments: subredditInfoFragment
  })
})(List);
