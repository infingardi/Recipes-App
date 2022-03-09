import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ src, titleCard, index, type }) {
  return (
    <div data-testid={ `${index}-${type}-card` }>
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
