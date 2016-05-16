import React from 'react';

export default class List extends React.Component {

  render() {
    return (
        <ul>
          <li><a href="/details">Item 1</a></li>
          <li><a href="/details">Item 2</a></li>
          <li><a href="/details">Item 3</a></li>
          <li><a href="/details">Item 4</a></li>
          <li><a href="/details">Item 5</a></li>
        </ul>
    );
  }

}
