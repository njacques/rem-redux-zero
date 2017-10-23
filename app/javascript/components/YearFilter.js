import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const YearFilter = ({ years }) => (
  <div className='filterLinks'>
    <Link to='/events'>All</Link>

    {
      years.map(year => (
        <Link to={{ pathname: '/events', search: `?year=${year}` }} key={year}>
          {year}
        </Link>
      ))
    }
  </div>
);

YearFilter.propTypes = {
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default YearFilter;
