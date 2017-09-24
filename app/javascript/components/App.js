/* global sessionStorage */

import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import ItemList from './ItemList';
import LogInForm from './LogInForm';
import PrivateRoute from './PrivateRoute';
import PropsRoute from './PropsRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: null,
    };

    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    this.isAuthed();
  }

  // Pass this to LoginForm component, so that it can set authed state in parent component
  handler() {
    this.setState({
      authed: true,
    });
  }

  isAuthed() {
    const token = sessionStorage.getItem('jwt');

    axios.get('http://localhost:3000/api/v1/events/1.json', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        this.setState({ authed: true });
      })
      .catch(() => {
        this.setState({ authed: false });
      });
  }

  render() {
    if (this.state.authed === null) return null;

    return (
      <Router>
        <div>
          <PropsRoute path='/login' component={LogInForm} handler={this.handler} />
          <PrivateRoute authed={this.state.authed} path='/' exact component={ItemList} />
        </div>
      </Router>
    );
  }
}

export default App;
