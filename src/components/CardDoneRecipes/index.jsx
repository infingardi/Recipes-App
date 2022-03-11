import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipBoard from 'clipboard-copy';
import { Link } from 'react-router-dom';

import shareIcon from '../../images/shareIcon.svg';

function CardDoneRecipes({ index, details }) {
  const [share, setShare] = useState(false);
  const {
    category,
    name,
    doneDate,
    tags,
    image,
    type,
    alcoholicOrNot,
    nationality,
    id,
  } = details;
  const recipeLink = `/${type}s/${id}`;

  function copyLink() {
    clipBoard(`http://localhost:3000${recipeLink}`);
    setShare(true);
  }

  return (
    <div>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot }
      </p>
      <Link to={ recipeLink } className="card-class">
        <img data-testid={ `${index}-horizontal-image` } src={ image } alt={ index } />
        <h3 data-testid={ `${index}-horizontal-name` }>{ name }</h3>
      </Link>

      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      { share ? <p>Link copied!</p> : <input
        type="image"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        alt="share-btn"
        onClick={ copyLink }
      /> }
      { tags.map((tag) => (
        <p
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ tag }
        >
          { tag }
        </p>))}

    </div>
  );
}

CardDoneRecipes.propTypes = {
  index: PropTypes.number,
  details: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
  }),
}.isRequired;

export default CardDoneRecipes;
