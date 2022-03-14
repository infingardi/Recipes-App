import React, { useState } from 'react';
import clipBoard from 'clipboard-copy';
import CardFavorites from '../../components/CardFavorites';

import Header from '../../components/Header';

function FavoriteRecipes() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')));
  const [share, setShare] = useState(true);
  const [filter, setFilter] = useState('');

  const handleClick = (favorites) => {
    const local = (window.location.href).split('/');
    clipBoard(`${local[0]}//${local[2]}/${favorites.type}s/${favorites.id}`);
    setShare(false);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <section className="btn-favorites">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drink
        </button>
      </section>
      {
        data.filter((type) => type.type.includes(filter)).map((favorites, index) => (
          <CardFavorites
            change={ setData }
            key={ favorites.id }
            id={ favorites.id }
            index={ index }
            img={ favorites.image }
            name={ favorites.name }
            nationality={ favorites.nationality }
            category={ favorites.category }
            alcoholic={ favorites.alcoholicOrNot }
            foods={ favorites.type }
            share={ share }
            onClick={ () => {
              handleClick(favorites);
            } }
          />
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
