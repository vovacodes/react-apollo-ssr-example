import React from 'react';
import Description from './Description';

export default class Details extends React.Component {

  render() {
    return (
        <div>
          <h2>Details</h2>
          <Description text="Fancy description" />
        </div>
    );
  }

}
