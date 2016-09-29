const express = require('express');
const expressGraphql = require('express-graphql');
const React = require('react');
const { createMemoryHistory, match, RouterContext } = require('react-router');
const ApolloClient = require('apollo-client').default;
const { ApolloProvider } = require('react-apollo');
const { renderToStringWithData } = require('react-apollo/server');
const { Reddit } = require('graphqlhub-schemas');
const { GraphQLSchema, graphql } = require('graphql');
const { print } = require('graphql-tag/printer');

const App = require('./components/App').default;
const { getRoutes } = require('./routes');

const app = express();

// define GraphQL Schema
const graphqlSchema = new GraphQLSchema({
  query: Reddit.QueryObjectType
});

// define ApolloClient's NetworkInterface, that will resolve the queries locally
const localGraphQLNetworkInterface = {
  query: (graphqlRequest) => graphql(
      graphqlSchema,
      print(graphqlRequest.query),
      null,
      null,
      graphqlRequest.variables,
      graphqlRequest.operationName
  )
};

// initialize ApolloClient
const apolloClient = new ApolloClient({
  networkInterface: localGraphQLNetworkInterface
});

app.use('/graphql', expressGraphql({
  schema: graphqlSchema,
  graphiql: true
}));

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

    renderToStringWithData(app).then(({ markup, initialState }) => {
      res.send(markup);
    });
  });
});

app.listen(8484, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on http://127.0.0.1:8484')
});
