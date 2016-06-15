import Main from "../components/Main";
import WelcomeBody from "../components/WelcomeBody"
import MyBooks from "../components/MyBooks"
import AllBooks from "../components/AllBooks"
import Setting from "../components/Setting"
import React from "react";
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path='/' component={Main}>
	  	<IndexRoute component={WelcomeBody} />
	  	<Route path="my" component={MyBooks} />
	  	<Route path="all" component={AllBooks} />
	  	<Route path="settings" component={Setting} />
  	</Route>
);
