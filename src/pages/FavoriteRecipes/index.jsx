import React from 'react';
import CardFavorites from '../../components/CardFavorites';

import Header from '../../components/Header';

function FavoriteRecipes() {
  const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(data);

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
            foods={ favorites.types }
          />
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
