import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import NavBar from './NavBar';
import NewEvent from './NewEvent';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activeItem: {},
    };

    this.toggleActiveItem = this.toggleActiveItem.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/events.json')
      .then((response) => {
        this.setState({ events: response.data });
      })
      .catch(error => console.log(error));
  }

  toggleActiveItem(eventId) {
    this.setState({ activeItem: { [eventId]: true } });
  }

  render() {
    return (
      <div>
        <NavBar
          currentUser={this.props.currentUser}
          logoutHandler={this.props.logoutHandler}
          activeItemHandler={this.toggleActiveItem}
        />

        <section>
          <div className='events-container'>
            <h2>
              Events
              <Link
                to='/new'
                onClick={() => this.toggleActiveItem(0)}
              >
                New Event
              </Link>
            </h2>

            <input className='search' placeholder='Search' type='text' />

            <ul className='events-list'>
              {
                this.state.events.map(event => (
                  <li
                    key={event.id}
                    className={this.state.activeItem[event.id] ? 'active' : ''}
                  >
                    <span
                      role='button'
                      tabIndex='0'
                      onClick={() => this.toggleActiveItem(event.id)}
                    >
                      {event.event_date} - {event.event_type}
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
        </section>

        <Route path='/new' component={NewEvent} />
      </div>
    );
  }
}

Editor.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default Editor;
