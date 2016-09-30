const fs = require('fs');
const path = require('path');

const colors = require('colors');
const { Reddit } = require('graphqlhub-schemas');
const { GraphQLSchema, graphql } = require('graphql');
const { introspectionQuery } = require('graphql/utilities/introspectionQuery');

const schemaFilePath = path.resolve('./graphql.schema.json');
const graphqlSchema = new GraphQLSchema({
  query: Reddit.QueryObjectType
});

console.log(colors.magenta('updating GraphQL schema...'));
graphql(
    graphqlSchema,
    introspectionQuery
).then((response) => {
  fs.writeFileSync(schemaFilePath, JSON.stringify(response, null, '  '));
  console.log(colors.green(`GraphQL schema updated and stored at ${schemaFilePath}`));
}).catch((err) => {
  console.error(colors.red(`There was an error updating GraphQL schema: ${err}`));
});
