import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import List from './components/List';
import Details from './components/Details';

export const getRoutes = () => {
  return (
      <Route path="/" foo="bar" component={App}>
        <IndexRoute component={List} />
        <Route path="/details/:id" component={Details}/>
      </Route>
  );
};
