import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function Card({ src, titleCard, index, type, id, foods }) {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid={ `${index}-${type}-card` }
      onClick={ () => history.push(`/${foods}/${id}`) }
      key={ index }
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
