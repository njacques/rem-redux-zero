/* global location */

import { error } from '../packs/notifications';

const byEventDateDesc = (a, b) => (new Date(b.event_date) - new Date(a.event_date));

function pad(n) { return n < 10 ? `0${n}` : n; }

const getEventYear = event => event.event_date.substring(0, 4);

const matchYear = year => event => getEventYear(event).match(year);

const matchSearchTerm = searchTerm => (event) => {
  const { id, published, created_at, updated_at, ...rest } = event;

  return Object.values(rest).some(value => (
    value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
  ));
};

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
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

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

export const withQueryString = pathname => ({ pathname, search: location.search });

export const getAvailableYears = events => (
  events
    .map(getEventYear)
    .filter(unique)
    .reverse()
);

export const getEventsByYear = (events, selectedYear, searchTerm) =>
  events
    .filter(matchYear(selectedYear))
    .filter(matchSearchTerm(searchTerm))
    .sort(byEventDateDesc);
