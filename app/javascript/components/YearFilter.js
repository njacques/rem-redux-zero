import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const YearFilter = ({ years, selectedYear }) => (
  <div className='filterLinks'>
    <Link to='/events' className={(selectedYear === '') ? 'active' : ''}>
      All
    </Link>

    {
      years.map(year => (
        <Link
          to={{ pathname: '/events', search: `?year=${year}` }}
          key={year}
          className={(selectedYear === year) ? 'active' : ''}
        >
          {year}
        </Link>
      ))
    }
  </div>
);

YearFilter.propTypes = {
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedYear: PropTypes.string.isRequired,
};

export default YearFilter;
