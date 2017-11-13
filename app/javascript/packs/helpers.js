import { error } from '../packs/notifications';

export function getEventYear(el) {
  return el.event_date.substring(0, 4);
}

export function unique(value, index, self) {
  return self.indexOf(value) === index;
}

export function getSelectedYear(queryString) {
  return queryString.replace('?year=', '');
}

export function validateEvent(event) {
  const errors = {};

  if (event.event_type === '') {
    errors.event_type = 'You must enter an event type';
  }

  if (event.event_date == 'Invalid Date') {
    errors.event_date = 'You must enter a valid date';
  }

  if (event.title === '') {
    errors.title = 'You must enter a title';
  }

  if (event.speaker === '') {
    errors.speaker = 'You must enter at least one speaker';
  }

  if (event.host === '') {
    errors.host = 'You must enter at least one host';
  }

  return errors;
}

export function dateToString(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

export function strToDate(dateString) {
  return new Date(`${dateString} 00:00:00`);
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.log(err);
};
