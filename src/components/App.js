import React from 'react';

class App extends React.Component {

  render() {
    return (
        <div>
          <a href="/"><h1>Synth Music Subreddits</h1></a>
          {this.props.children}
        </div>
    );
  }

}

export default App;
