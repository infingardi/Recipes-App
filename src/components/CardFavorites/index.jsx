import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function CardFavorites({ key, index, img, name, nationality, category, alcoholic, foods }) {
  return (
    <button
      type="button"
      data-testid={ `${key}-${name}-card` }
      key={ key }
      // onClick={ onClick }
      // className="card-class"
    >
      <img data-testid={ `${index}-horizontal-image` } src={ img } alt={ name } />
      {
        console.log(index)
      }
      <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      {/* <p>{ nationality }</p> */}
      <p data-testid={ `${index}-horizontal-top-text` }>
        {
          `${nationality} - ${category} && ${alcoholic}`
        }
      </p>
      <button
        type="button"
      >
        <img
          src={ shareIcon }
          alt={ name }
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <button
        type="button"
      >
        <img
          src={ blackHeartIcon }
          alt={ name }
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </button>
  );
}

CardFavorites.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  // key: PropTypes.string,
  nationality: PropTypes.string,
  category: PropTypes.string,
  // onClick: PropTypes.func,
}.isRequired;
