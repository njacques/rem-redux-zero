import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Editor from './Editor';
import PrivateRoute from './PrivateRoute';
import LogInForm from './LogInForm';

const App = () => (
  <div>
    <Switch>
      <Route path='/login' component={LogInForm} />
      <PrivateRoute path='/events/:id?' component={Editor} />
      <Redirect to='/events' />
    </Switch>
  </div>
);

export default App;
