import React, { useState } from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import Rate from './Rate';
import ReviewCard from './ReviewCard';

const Review = ({ setReview, oldReview, id }) => {
  const [data, setData] = useState({ email: '', stars: '', text: '' });

  const handleClickStars = () => {
    const stars = document.querySelector('#email-line').innerText;
    setData({ ...data, stars });
  };

  const handleChange = (elem) => setData(
    { ...data, [elem.id]: elem.value },
  );

  return (
    <form
      className="review-form"
      onSubmit={ (e) => {
        e.preventDefault();
        setReview(
          [...oldReview,
            <ReviewCard review={ data } key={ String(Math.random()) } />,
          ],
        );
        const items = (localStorage.getItem(id))
          ? [data, ...JSON.parse(localStorage.getItem(id))]
          : `[${JSON.stringify(data)}]`;

        localStorage.setItem(id, (localStorage.getItem(id))
          ? JSON.stringify(items)
          : items);
      } }
    >
      <div id="email-line">
        <input
          required
          type="email"
          placeholder="Email"
          id="email"
          onClick={ () => handleClickStars() }
          onChange={ (e) => handleChange(e.target) }
        />
        <Rate handleClickStars={ handleClickStars } />
      </div>
      <textarea
        required
        cols="45"
        data-testid="product-detail-evaluation"
        rows="10"
        placeholder="Mensagem (Opcional)"
        id="text"
        onChange={ (e) => handleChange(e.target) }
      />
      <button
        type="submit"
      >
        Avaliar
      </button>
    </form>
  );
};

Review.propTypes = {
  setReview: PropTypes.func.isRequired,
  oldReview: PropTypes.oneOfType([arrayOf(PropTypes.object), PropTypes.array]).isRequired,
  id: PropTypes.string.isRequired,
};

export default Review;
