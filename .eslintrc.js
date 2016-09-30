module.exports = {
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['graphql'],
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: require('./graphql.schema.json')
      }
    ]
  }
};
