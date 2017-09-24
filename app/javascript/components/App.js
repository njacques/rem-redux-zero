import React from 'react';
import axios from 'axios'

import './App.css';
import ItemList from './ItemList';
import LogInForm from './LogInForm';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    // Grab token from storage and asscertain if it's valid
    //
    const token = sessionStorage.getItem('jwt');
    axios.get("http://localhost:3000/api/v1/events/1.json", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(response => this.setState({isLoggedIn: true}))
    .catch(error => console.log(error))
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    if (isLoggedIn) {
      return(
        <div>
          <h1>IGSN Calendar Editor</h1>
          <ItemList/>
        </div>
      )
    }

    return <LogInForm />;
  }
}

export default App;
