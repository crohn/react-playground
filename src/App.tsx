import React, { Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { css, Global } from '@emotion/core';
import { GridLayoutPage } from './components/GridLayout';
import { Home } from './components/Home';

export const App = (): JSX.Element => (
  <Fragment>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          font-family: 'Oxanium', cursive;
          font-size: 14px;
          font-weight: 300;
        }

        h1 {
          font-size: 32px;
          font-weight: 600;
        }

        h2 {
          font-size: 24px;
          font-weight: 600;
        }

        a {
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      `}
    />
    <header>
      <Link to="/">
        <h1>React Playground</h1>
      </Link>
    </header>
    <Switch>
      <Route path="/react-grid-layout">
        <GridLayoutPage />
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
