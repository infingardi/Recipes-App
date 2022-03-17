import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import clipBoard from 'clipboard-copy';

import { useIngretientes, useUpdateInProgress } from '../../hooks';
import { actionAddFavorite, removeFavorites,
  setFoodAndDrinks, setInProgressRecipes } from '../../redux/actions';
import { getDrink, getFood } from '../../services';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function DrinkDetails() {
  const { id } = useParams();
  const { newProgress } = useUpdateInProgress('cocktails');
  const [recommended, setRecommended] = useState([]);
  const [share, setShare] = useState('share');
  const { responseFoodAndDrinks, favoriteRecipes,
    doneRecipes, inProgressRecipes } = useSelector((state) => state);
  const [isFavorite, setIsFavorite] = useState(favoriteRecipes.some((e) => e.id === id));
  const dispatch = useDispatch();
  const history = useHistory();
  const [ingredientes, quantities] = useIngretientes(responseFoodAndDrinks[0]);
  const ID_ENPOINT = 'lookup.php?i=';
  const MAX_LENGH_RECOMMENDED = 6;
  const isDoneRecipe = doneRecipes.some((e) => e.idDrink === id)
  || doneRecipes.some((e) => e.id === id);
  const isProgress = inProgressRecipes.cocktails[id];

  const setDrink = useCallback(async () => {
    dispatch(setFoodAndDrinks(await getDrink(`${ID_ENPOINT}${id}`)));
    setRecommended(await getFood('search.php?s='));
  }, [dispatch, id]);

  useEffect(() => {
    setDrink();
  }, [setDrink]);

  function startRecipe() {
    // dispatch(actionAddDone(responseFoodAndDrinks[0]));
    dispatch(setInProgressRecipes('cocktails', { [id]: [] }));
    newProgress();

    history.push(`${id}/in-progress`);
  }

  function copyLink() {
    clipBoard(`http://localhost:3000/drinks/${id}`);
    setShare('Link copied!');
  }

  function setFavorite() {
    const objFavorites = {
      id,
      type: 'drink',
      nationality: '',
      category: responseFoodAndDrinks[0].strCategory,
      alcoholicOrNot: responseFoodAndDrinks[0].strAlcoholic,
      name: responseFoodAndDrinks[0].strDrink,
      image: responseFoodAndDrinks[0].strDrinkThumb,
    };
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      dispatch(removeFavorites(id));
    } else {
      dispatch(actionAddFavorite(objFavorites));
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favoriteRecipes, objFavorites]));
    }
  }
  return (
    <div>
      <section>
        {responseFoodAndDrinks[0] && (
          <>
            <section className="container-img">
              <img
                data-testid="recipe-photo"
                src={ responseFoodAndDrinks[0].strDrinkThumb }
                alt=""
              />
              <div>
                <div>
                  <h1 data-testid="recipe-title">{responseFoodAndDrinks[0].strDrink}</h1>
                  <h3
                    data-testid="recipe-category"
                  >
                    {responseFoodAndDrinks[0].strAlcoholic}
                  </h3>
                </div>
                <div className="shareAndFavorite-btn">
                  <button
                    data-testid="share-btn"
                    type="button"
                    onClick={ copyLink }
                  >
                    {share}

                  </button>
                  <input
                    alt="button favorite"
                    type="image"
                    data-testid="favorite-btn"
                    onClick={ setFavorite }
                    src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  />
                </div>
              </div>
            </section>
            <section className="ingredients-container">
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
            <section className="instructions-container">
              <h3>Instructions</h3>
              <p
                data-testid="instructions"
              >
                { responseFoodAndDrinks[0].strInstructions}
              </p>
            </section>
          </>
        )}
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
          className="continueAndStart-btn"
          type="button"
          onClick={ startRecipe }
        >
          Start recipe
        </button>
      )}
      {isProgress && (
        <button
          data-testid="start-recipe-btn"
          className="continueAndStart-btn"
          type="button"
          onClick={ () => history.push(`${id}/in-progress`) }
        >
          Continue Recipe
        </button>
      )}
    </div>
  );
}
