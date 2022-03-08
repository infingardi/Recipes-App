import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ src, titleCard, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ src } alt="" />
      <h3 data-testid={ `${index}-card-name` }>{titleCard}</h3>
    </div>
  );
}

Card.propTypes = {
  src: PropTypes.string,
  titleCard: PropTypes.string,
  index: PropTypes.string,
}.isRequired;
