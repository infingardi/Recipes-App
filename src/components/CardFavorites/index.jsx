import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function CardFavorites({
  id,
  change,
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
  const removeFavorite = (key) => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log('aqui');
    const filter = data.filter((favorite) => favorite.id !== key);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
    change(filter);
  };

  return (
    <section
      data-testid={ `${id}-${name}-card` }
      key={ id }
      // onClick={ onClick }
      // className="card-class"
    >
      <Link
        to={ `/${foods}s/${id}` }
      >
        <img data-testid={ `${index}-horizontal-image` } src={ img } alt={ name } />
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      </Link>
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
        onClick={ () => removeFavorite(id) }
      >
        <img
          src={ blackHeartIcon }
          alt={ name }
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </section>
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
