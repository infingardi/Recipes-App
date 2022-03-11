import React, { useState } from 'react';
import clipBoard from 'clipboard-copy';
import CardFavorites from '../../components/CardFavorites';

import Header from '../../components/Header';

function FavoriteRecipes() {
  const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [share, setShare] = useState(true);

  // const handleClick = () => {
  //   alert('Link copied!');
  // };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <section className="btn-favorites">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </section>
      {
        data.map((favorites, index) => (
          <CardFavorites
            key={ favorites.id }
            index={ index }
            img={ favorites.image }
            name={ favorites.name }
            nationality={ favorites.nationality }
            category={ favorites.category }
            alcoholic={ favorites.alcoholicOrNot }
            foods={ favorites.type }
            share={ share }
            onClick={ () => {
              clipBoard(`http://localhost:3000/${favorites.type}s/${favorites.id}`);
              setShare(false);
            } }
          />
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
