import React from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreFoods() {
  const { push } = useHistory();
  return (
    <div>
      <Header title="Explore Foods" />
      <main>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ () => push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Surprise me!
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
