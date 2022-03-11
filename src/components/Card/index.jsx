import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ src, titleCard, index, type, onClick }) {
  return (
    <button
      type="button"
      data-testid={ `${index}-${type}-card` }
      onClick={ () => onClick(titleCard) }
      key={ index }
      className="card-class"
    >
      <img data-testid={ `${index}-card-img` } src={ src } alt={ titleCard } />
      <h3 data-testid={ `${index}-card-name` }>{titleCard}</h3>
    </button>
  );
}

Card.propTypes = {
  src: PropTypes.string,
  titleCard: PropTypes.string,
  index: PropTypes.string,
}.isRequired;
