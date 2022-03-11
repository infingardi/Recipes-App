import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function CardFavorites({
  key,
  index,
  img,
  name,
  nationality,
  category,
  alcoholic,
  foods,
  onClick,
  share,
}) {
  return (
    <button
      type="button"
      data-testid={ `${key}-${name}-card` }
      key={ key }
      // onClick={ onClick }
      // className="card-class"
    >
      <img data-testid={ `${index}-horizontal-image` } src={ img } alt={ name } />
      <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { (foods === 'food') ? `${nationality} - ${category}` : `${alcoholic}`}
      </p>
      <button
        type="button"
        onClick={ onClick }
      >
        <section
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
        >
          {share
            ? <img src={ shareIcon } alt={ name } />
            : <p>Link copied!</p>}
        </section>
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
