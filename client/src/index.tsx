import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Supplier, Address, NotFound } from './sections';
import { Container } from '@material-ui/core';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: process.env.REACT_APP_APOLLO_URL || 'http://localhost:9999/api',
});

const App = () => {
  return (
    <Container maxWidth="sm">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/supplier/:id" component={Supplier} />
          <Route exact path="/address/:address" component={Address} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Container>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
