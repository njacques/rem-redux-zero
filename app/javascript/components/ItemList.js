import React from 'react';
import axios from 'axios'

class ItemList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/events.json')
    .then(response => {
      this.setState({events: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    return(
      <ul>
       {this.state.events.map((event) => {
          return (
            <li key={event.id}>
              {event.event_date} - {event.event_type}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default ItemList;
