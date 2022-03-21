import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLogin } from '../../hooks';
import CardDoneRecipes from '../../components/CardDoneRecipes';
import Header from '../../components/Header';

function DoneRecipes() {
  const { verifyLogin } = useLogin();

  const done = useSelector(({ doneRecipes }) => doneRecipes);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    verifyLogin();
    setDoneRecipes(done);
  }, []);

  return (
    <main>
      <Header title="Done Recipes" />
      <section>
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
          Drinks
        </button>
      </section>
      <section>
        {doneRecipes.filter((recipe) => recipe.type.includes(filter)).map(
          (recipe, index) => (
            <CardDoneRecipes
              index={ index }
              details={ recipe }
              key={ index }
            />
          ),
        )}
      </section>
    </main>
  );
}

export default DoneRecipes;
