import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Pikaday from 'react-pikaday/bundled';

import {
  validateEvent,
  dateToString,
  strToDate,
  isEmptyObject,
} from '../packs/helpers';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    const event = {
      event_type: '',
      event_date: null,
      title: '',
      speaker: '',
      host: '',
      published: false,
    };

    if (props.event) {
      Object.assign(event, {
        ...props.event,
        event_date: strToDate(props.event.event_date),
      });
    }

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
        event_date: strToDate(nextProps.event.event_date),
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
        <ul>
          {Object.values(errors).map(e => <li>{e}</li>)}
        </ul>
      </div>
    );
  }

  render() {
    const { event } = this.state;

    const title = event.id
      ? `${dateToString(event.event_date)} - ${event.event_type}`
      : 'New Event';

    const cancelURL = event.id ? `/events/${event.id}` : '/events';

    return (
      <div>
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
              defaultValue={event.event_type}
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
              defaultValue={event.title}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='speaker'><strong>Speakers:</strong></label>
            <input
              type='text'
              name='speaker'
              defaultValue={event.speaker}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='host'><strong>Hosts:</strong></label>
            <input
              type='text'
              name='host'
              defaultValue={event.host}
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
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

EventForm.propTypes = {
  event: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
};

EventForm.defaultProps = {
  event: {},
};

export default EventForm;
