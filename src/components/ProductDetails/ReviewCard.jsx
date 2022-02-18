import React from 'react';
import PropTypes from 'prop-types';

const ReviewCard = ({ review }) => (
  <div className="review-card">
    <div>
      <p>{review.email}</p>
      <p>{review.stars}</p>
    </div>
    <p>{review.text}</p>
  </div>
);

ReviewCard.propTypes = {
  review: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ReviewCard;
