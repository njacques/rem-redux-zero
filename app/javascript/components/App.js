import React from 'react';
import { Route, Switch } from 'react-router-dom';

import 'react-s-alert/dist/s-alert-default.css';
import './App.css';

import { Alert } from '../packs/notifications';
import Editor from './Editor';
import PrivateRoute from './PrivateRoute';
import LogInForm from './LogInForm';

const App = () => (
  <div>
    <Switch>
      <Route path='/login' component={LogInForm} />
      <PrivateRoute path='/events/:id?' component={Editor} />
    </Switch>
    <Alert stack={{ limit: 3 }} />
  </div>
);

export default App;
