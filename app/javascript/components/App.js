import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'redux-zero/react';

import './App.css';
import { Alert } from '../packs/notifications';
import store from '../store';
import Editor from './Editor';
import PrivateRoute from './PrivateRoute';
import LogInForm from './LogInForm';
import LogOut from './LogOut';

const App = () => (
  <Provider store={store}>
    <div>
      <Switch>
        <Route path='/login' component={LogInForm} />
        <Route path='/logout' component={LogOut}  />
        <PrivateRoute path='/events/:id?' component={Editor} />
      </Switch>
      <Alert stack={{ limit: 3 }} />
    </div>
  </Provider>
);

export default App;
