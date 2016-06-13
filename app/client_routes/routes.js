import Main from "../components/Main";
import WelcomeBody from "../components/WelcomeBody"
import MyBooks from "../components/MyBooks"
import React from "react";
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path='/' component={Main}>
  	<IndexRoute component={WelcomeBody} />
  	<Route path="all" component={MyBooks} />
  </Route>
);
