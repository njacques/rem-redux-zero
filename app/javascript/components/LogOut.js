import PropTypes from 'prop-types';

const LogOut = ({ logoutUser }) => logoutUser();

LogOut.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default LogOut;
