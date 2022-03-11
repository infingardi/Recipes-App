import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import useIngretientes from '../../hooks';
import { actionAddDone, setFoodAndDrinks } from '../../redux/actions';
import { getDrink, getFood } from '../../services';

export default function DrinkDetails() {
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
  const isDoneRecipe = doneRecipes.some((e) => e.idDrink === id)
  || doneLocalStorage.some((e) => e.id === id);
  const isProgress = progressStorage.cocktails[id];

  const setDrink = useCallback(async () => {
    dispatch(setFoodAndDrinks(await getDrink(`${ID_ENPOINT}${id}`)));
    setRecommended(await getFood('search.php?s='));
  }, [dispatch, id]);

  useEffect(() => {
    setDrink();
  }, [setDrink]);

  function startRecipe() {
    const dataForTest = { ...data, id };
    const progressForTest = { ...progressStorage, cocktails: { [id]: [] } };
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
              <img data-testid="recipe-photo" src={ data.strDrinkThumb } alt="" />
              <div>
                <h1 data-testid="recipe-title">{data.strDrink}</h1>
                <h3 data-testid="recipe-category">{data.strAlcoholic}</h3>
              </div>
              <div>
                <button data-testid="share-btn" type="button">share</button>
                <button data-testid="favorite-btn" type="button">favorite</button>
              </div>
            </section>
            {/* {infredientes} */}
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
            {/* instruction */}
            <section>
              <h3>Instructions</h3>
              <p data-testid="instructions">{data.strInstructions}</p>
            </section>
          </>
        )}
        {/* Recommended */}
        <section className="carrocel-container">
          <h3>Recommended</h3>
          <div>
            {recommended.meals && recommended.meals.slice(0, MAX_LENGH_RECOMMENDED)
              .map((e, i) => (
                <div key={ e.idMeal } data-testid={ `${i}-recomendation-card` }>
                  <img src={ e.strMealThumb } alt="" width="200px" />
                  <span>{e.strCategory}</span>
                  <h4 data-testid={ `${i}-recomendation-title` }>{e.strMeal}</h4>
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
