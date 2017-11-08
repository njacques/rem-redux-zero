import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const defaults = {
  position: 'top-right',
  effect: 'slide',
  timeout: 3500,
  offset: 45,
};

export { Alert };

export const success = (message, options = {}) => {
  Alert.success(message, Object.assign(defaults, options));
};

export const info = (message, options = {}) => {
  Alert.info(message, Object.assign(defaults, options));
};

export const warning = (message, options = {}) => {
  Alert.warning(message, Object.assign(defaults, options));
};

export const error = (message, options = {}) => {
  Alert.error(message, Object.assign(defaults, options));
};
