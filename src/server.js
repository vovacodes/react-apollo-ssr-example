const { inspect }  = require('util');
const express = require('express');
const React = require('react');
const ReactDomServer = require('react-dom/server');
const { createMemoryHistory, match, RouterContext } = require('react-router');
const ApolloClient = require('apollo-client').default;
const { ApolloProvider } = require('react-apollo');

const App = require('./components/App').default;
const { getRoutes } = require('./routes');

const app = express();
const mockGraphQLNetworkInterface = {
  query: () => Promise.resolve({ data: { list: [ 'apple', 'orange' ] }, errors: null })
};
const apolloClient = new ApolloClient({
  networkInterface: mockGraphQLNetworkInterface
});

// Server-Side-Rendering
app.use((req, res) => {

  const history = createMemoryHistory(req.path);
  const routes = getRoutes();

  // Find the correct route
  match({ history, routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    if (!renderProps) {
      return res.status(404).send('Not found');
    }

    const app = (
        <ApolloProvider client={apolloClient} >
          <RouterContext {...renderProps}/>
        </ApolloProvider>
    );

    console.log('app.props.children', inspect(app.props.children));

    const html = ReactDomServer.renderToString(app);

    res.send(html);
  });
});

app.listen(8484, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on http://127.0.0.1:8484')
});
