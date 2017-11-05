import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    const event = {
      event_type: '',
      event_date: '',
      title: '',
      speaker: '',
      host: '',
      published: false,
    };

    Object.assign(event, props.event);

    this.state = {
      event,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmit called');
    this.props.onSubmit(this.state.event);
  }

  render() {
    const { event } = this.props;

    const title = event.id
      ? `${event.event_date} - ${event.event_type}`
      : 'New Event';

    return (
      <div>
        <h2>
          {title}
        </h2>

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
            <input
              type='text'
              name='event_date'
              defaultValue={event.event_date}
              onChange={this.handleInputChange}
            />
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
            <Link to={`/events/${event.id}`}>Cancel</Link>
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
