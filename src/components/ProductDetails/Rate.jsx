import React from 'react';
import PropTypes from 'prop-types';

const Rate = ({ handleClickStars }) => {
  const iterationNumber = 5;
  return (
    [...Array(iterationNumber)].map((x, num) => (
      <span
        key={ num + 1 }
        className="star"
        role="button"
        tabIndex={ 0 }
        onKeyPress={ () => {} }
        onClick={ () => {
          const maxStars = 4;
          const star = (i) => document.querySelectorAll('.star')[i];
          for (let i = 0; i <= num; i += 1) {
            star(i).innerHTML = '&#9733;';
          }
          for (let n = num + 1; n <= maxStars; n += 1) {
            star(n).innerHTML = '&#9734;';
          }
          handleClickStars();
        } }
      >
        &#9734;
      </span>
    ))
  );
};

Rate.propTypes = {
  handleClickStars: PropTypes.func.isRequired,
};

export default Rate;
