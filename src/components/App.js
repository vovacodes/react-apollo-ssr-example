import React from 'react';
import { connect } from 'react-apollo';
import gql from 'apollo-client/gql';

class App extends React.Component {

  render() {
    return (
        <div>
          <h1>This is the app: {JSON.stringify(this.props.list)}</h1>
          {this.props.children}
        </div>
    );
  }

}

export default connect({
  mapQueriesToProps: ({ ownProps, state }) => {
    return {
      list: {
        query: gql`
          {
            list
          }
        `
      }
    };
  }
})(App);
