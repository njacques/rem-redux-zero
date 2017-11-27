import createStore from 'redux-zero';
import cookies from 'js-cookie';
import queryString from 'query-string';

import history from './customHistory';

const parsed = queryString.parse(history.location.search);

const initialState = {
  currentUser: cookies.get('currentUser'),
  events: [],
  isAuthed: !!cookies.get('jwt'),
  jwt: cookies.get('jwt'),
  loginError: null,
  selectedYear: parsed.year || '',
  searchTerm: '',
};
const store = createStore(initialState);

history.listen((location) => {
  const parsed = queryString.parse(location.search);
  store.setState({ selectedYear: parsed.year || '' });
});

store.subscribe((state) => {
  console.log('stateChanges', state);
});

export default store;
