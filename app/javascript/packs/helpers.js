export function getEventYear(el) {
  return el.event_date.substring(0, 4);
}

export function unique(value, index, self) {
  return self.indexOf(value) === index;
}
