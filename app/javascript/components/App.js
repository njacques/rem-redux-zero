import React from 'react';
import './App.css';
import ItemList from './ItemList';

class App extends React.Component{
  render() {
    return(
      <div>
        <h1>IGSN Calendar Editor</h1>
        <ItemList/>
      </div>
    )
  }
}

export default App;
