import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Pikaday from 'react-pikaday/bundled';

import EventNotFound from './EventNotFound';
import {
  validateEvent,
  dateToString,
  strToDate,
  isEmptyObject,
  withQueryString,
} from '../packs/helpers';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    const event = {
      ...props.event,
      event_date: strToDate(props.event.event_date),
    };

    this.state = {
      event,
      errors: {},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      event: {
        ...nextProps.event,
      },
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      event: {
        ...this.state.event,
        [name]: value,
      },
    });
  }

  handleDateChange(date) {
    this.setState({
      event: {
        ...this.state.event,
        event_date: date,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { event } = this.state;
    const errors = validateEvent(event);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      // convert date obj to string format that API is expecting
      event.event_date = dateToString(event.event_date);
      this.props.onSubmit(event);
    }
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className='errors'>
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => <li key={error}>{error}</li>)}
        </ul>
      </div>
    );
  }

  render() {
    const { event } = this.state;

    if (!event.id && this.props.path === '/events/:id/edit') return <EventNotFound />;

    const title = event.id
      ? `${dateToString(event.event_date)} - ${event.event_type}`
      : 'New Event';

    const cancelURL = event.id ? `/events/${event.id}` : '/events';

    return (
      <div className='eventForm'>
        <h2>
          {title}
        </h2>

        {this.renderErrors()}

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='event_type'><strong>Type:</strong></label>
            <input
              type='text'
              name='event_type'
              value={event.event_type}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='event_date'><strong>Date:</strong></label>
            <Pikaday value={event.event_date} onChange={this.handleDateChange} />
          </div>

          <div>
            <label htmlFor='title'><strong>Title:</strong></label>
            <textarea
              cols='30'
              rows='10'
              name='title'
              value={event.title}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='speaker'><strong>Speakers:</strong></label>
            <input
              type='text'
              name='speaker'
              value={event.speaker}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='host'><strong>Hosts:</strong></label>
            <input
              type='text'
              name='host'
              value={event.host}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='published'><strong>Publish:</strong></label>
            <input
              type='checkbox'
              name='published'
              checked={event.published}
              onChange={this.handleInputChange}
            />
          </div>

          <div className='form-actions'>
            <button type='submit'>Save</button>
            <Link to={withQueryString(cancelURL)}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  event: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

EventForm.defaultProps = {
  event: {
    event_type: '',
    event_date: null,
    title: '',
    speaker: '',
    host: '',
    published: false,
  },
};

export default EventForm;
