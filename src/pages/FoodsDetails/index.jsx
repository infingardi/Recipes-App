import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import useIngretientes from '../../hooks';
import { actionAddDone, setFoodAndDrinks } from '../../redux/actions';
import { getDrink, getFood } from '../../services';

export default function FoodsDetails() {
  const { params: { id } } = useRouteMatch();
  const [recommended, setRecommended] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks[0]);
  const doneRecipes = useSelector((state) => state.doneRecipes);
  const [ingredientes, quantities] = useIngretientes(data);
  const ID_ENPOINT = 'lookup.php?i=';
  const MAX_LENGH_RECOMMENDED = 6;
  const doneLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const progressStorage = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { meals: [], cocktails: [] };
  const isDoneRecipe = doneRecipes.some((e) => e.idMeal === id)
  || doneLocalStorage.some((e) => e.id === id);
  const isProgress = progressStorage.meals[id];

  const setFood = useCallback(async () => {
    dispatch(setFoodAndDrinks(await getFood(`${ID_ENPOINT}${id}`)));
    setRecommended(await getDrink('search.php?s='));
  }, [dispatch, id]);

  useEffect(() => {
    setFood();
  }, [setFood]);

  function startRecipe() {
    const dataForTest = { ...data, id };
    const progressForTest = { ...progressStorage, meals: { [id]: [] } };
    dispatch(actionAddDone(data));
    localStorage.setItem('doneRecipes',
      JSON.stringify([...doneLocalStorage, dataForTest]));
    localStorage.setItem('inProgressRecipes',
      JSON.stringify(progressForTest));
  }

  return (
    <div>
      <section>
        {data && (
          <>
            <section>
              <img data-testid="recipe-photo" src={ data.strMealThumb } alt="" />
              <div>
                <h1 data-testid="recipe-title">{data.strMeal}</h1>
                <h3 data-testid="recipe-category">{data.strCategory}</h3>
              </div>
              <div>
                <button data-testid="share-btn" type="button">share</button>
                <button data-testid="favorite-btn" type="button">favorite</button>
              </div>
            </section>
            <section>
              <h3>Ingredients</h3>
              <ul>
                {ingredientes.map((e, i) => (
                  <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                    {e[1]}
                    {' '}
                    {quantities[i][1]}
                  </li>
                ))}

              </ul>
            </section>
            <section>
              <h3>Instructions</h3>
              <p data-testid="instructions">{ data.strInstructions}</p>
            </section>
            <section>
              <h3>Video</h3>
              <iframe
                data-testid="video"
                src={ data.strYoutube }
                title={ data.strMeal }
                frameBorder="0"
              />
            </section>
          </>
        )}
        {/* Recommended */}
        <section className="carrocel-container">
          <h3>Recommended</h3>
          <div>
            {recommended.drinks && recommended.drinks.slice(0, MAX_LENGH_RECOMMENDED)
              .map((e, i) => (
                <div
                  key={ e.idDrink }
                  data-testid={ `${i}-recomendation-card` }
                >
                  <img src={ e.strDrinkThumb } alt="" width="200px" />
                  <span>{e.strAlcoholic}</span>
                  <h4 data-testid={ `${i}-recomendation-title` }>{e.strDrink}</h4>
                </div>
              ))}
          </div>
        </section>
      </section>
      {!isDoneRecipe && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ { position: 'fixed', bottom: '0' } }
          onClick={ startRecipe }
        >
          Start recipe
        </button>
      )}
      {isProgress && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          style={ { position: 'fixed', bottom: '0' } }
        >
          Continue Recipe
        </button>
      )}
    </div>
  );
}
