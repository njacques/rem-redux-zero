import axios from 'axios';
import cookies from 'js-cookie';

import history from './customHistory';
import { handleAjaxError, withQueryString } from './packs/helpers';
import { success } from './packs/notifications';

const actions = ({ getState, setState }) => ({

  fetchEvents: (state) => {
    const token = state.jwt;

    axios.defaults.baseURL = 'http://localhost:3000/api/v1/';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get('events.json')
      .then(response => setState({ events: response.data }))
      .catch(handleAjaxError);

    return { loading: true };
  },

  addEvent: (state, newEvent) => {
    axios.post('events.json', newEvent)
      .then((response) => {
        success('New event added');

        const savedEvent = response.data;
        const prevState = getState();
        const events = [...prevState.events, savedEvent];

        // Needs to come before history.push, as we are redirecting to new event
        setState({ events });
        history.push(withQueryString(`/events/${savedEvent.id}`));
      })
      .catch(handleAjaxError);
  },

  deleteEvent: (state, eventId) => {
    axios.delete(`events/${eventId}.json`)
      .then((response) => {
        if (response.status === 204) {
          success('Event deleted successfully');

          history.push(withQueryString('/events'));

          const prevState = getState();
          const events = prevState.events.filter(event => event.id !== eventId);
          setState({ events });
        }
      })
      .catch(handleAjaxError);
  },

  updateEvent: (state, updatedEvent) => {
    axios.put(`events/${updatedEvent.id}.json`, updatedEvent)
      .then(() => {
        success('Event updated');

        const prevState = getState();
        const events = [...prevState.events];
        const idx = events.findIndex(event => event.id === updatedEvent.id);
        events[idx] = updatedEvent;

        history.push(withQueryString(`/events/${updatedEvent.id}`));
        setState({ events });
      })
      .catch(handleAjaxError);
  },

  login: (state, email, password) => {
    axios
      .post('http://localhost:3000/users/login', { email, password })
      .then(({ data }) => {
        cookies.set('currentUser', data.email);
        cookies.set('jwt', data.auth_token);
        setState({ currentUser: data.email, jwt: data.auth_token, isAuthed: true });
        history.push('/events');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setState({ loginError: 'Invalid username or password' });
        }
      });
  },

  logoutUser: state => ({
    currentUser: undefined,
    isAuthed: false,
    jwt: undefined,
  }),

});

export default actions;
