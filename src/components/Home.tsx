import React from 'react';
import { Link } from 'react-router-dom';

export const Home = (): JSX.Element => (
  <ul>
    <li>
      <Link to="/pizza-menu-filter">Pizza Menu Filter</Link>
    </li>
    <li>
      <Link to="/react-grid-layout">React Grid Layout</Link>
    </li>
  </ul>
);
