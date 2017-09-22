import React from 'react';
import axios from 'axios'

class ItemList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3002/api/v1/items.json')
    .then(response => {
      this.setState({items: response.data})
      console.log(this.state)
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <ul>
       {this.state.items.map((item) => {
          return (
            <li key={item.id}>
              {item.name}: {item.description}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default ItemList;
