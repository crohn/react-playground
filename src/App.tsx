import React, { Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { GridLayout } from './components/GridLayout';
import { Home } from './components/Home';

export const App = (): JSX.Element => (
  <Fragment>
    <header>
      <h1>
        <Link to="/">React Playground</Link>
      </h1>
    </header>
    <Switch>
      <Route path="/react-grid-layout">
        <GridLayout />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>

      <Route>
        <div>No such project :(</div>
      </Route>
    </Switch>
  </Fragment>
);
