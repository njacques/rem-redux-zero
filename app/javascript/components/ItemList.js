import React from 'react';
import axios from 'axios';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/events.json')
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>IGSN Calendar Editor</h1>

        <ul>
          {
            this.state.events.map(event => (
              <li key={event.id}>
                {event.event_date} - {event.event_type}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default ItemList;
