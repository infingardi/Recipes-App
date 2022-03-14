import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import clipBoard from 'clipboard-copy';

import { useIngretientes, useUpdateInProgress } from '../../hooks';
import { actionAddFavorite, removeFavorites,
  setFoodAndDrinks, actionAddDone, setInProgressRecipes } from '../../redux/actions';
import { getDrink, getFood } from '../../services';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FoodsDetails() {
  const { id } = useParams();
  const { newProgress } = useUpdateInProgress('meals');
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
  const isDoneRecipe = doneRecipes.some((e) => e.idMeal === id)
  || doneRecipes.some((e) => e.id === id);
  const isProgress = inProgressRecipes.meals[id];

  const setFood = useCallback(async () => {
    dispatch(setFoodAndDrinks(await getFood(`${ID_ENPOINT}${id}`)));
    setRecommended(await getDrink('search.php?s='));
  }, [dispatch, id]);

  useEffect(() => {
    setFood();
  }, [setFood]);

  function startRecipe() {
    dispatch(actionAddDone(responseFoodAndDrinks[0]));
    dispatch(setInProgressRecipes('meals', { [id]: [] }));
    newProgress();

    history.push(`${id}/in-progress`);
  }

  function copyLink() {
    clipBoard(`http://localhost:3000/foods/${id}`);
    setShare('Link copied!');
  }

  function setFavorite() {
    const objFavorites = {
      id,
      type: 'food',
      nationality: responseFoodAndDrinks[0].strArea,
      category: responseFoodAndDrinks[0].strCategory,
      alcoholicOrNot: '',
      name: responseFoodAndDrinks[0].strMeal,
      image: responseFoodAndDrinks[0].strMealThumb,
    };
    setIsFavorite(!isFavorite);
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
            <section>
              <img
                data-testid="recipe-photo"
                src={ responseFoodAndDrinks[0].strMealThumb }
                alt=""
              />
              <div>
                <h1 data-testid="recipe-title">{responseFoodAndDrinks[0].strMeal}</h1>
                <h3
                  data-testid="recipe-category"
                >
                  {responseFoodAndDrinks[0].strCategory}
                </h3>
              </div>
              <div>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ copyLink }
                >
                  {share}

                </button>
                <button
                  type="button"
                  onClick={ setFavorite }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                    alt=""
                  />
                </button>
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
              <p
                data-testid="instructions"
              >
                { responseFoodAndDrinks[0].strInstructions}
              </p>
            </section>
            <section>
              <h3>Video</h3>
              { console.log() }
              <iframe
                width="500px"
                height="500px"
                data-testid="video"
                src={ responseFoodAndDrinks[0].strYoutube
                  && responseFoodAndDrinks[0].strYoutube.replace('watch?v=', 'embed/') }
                title={ responseFoodAndDrinks[0].strMeal }
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
                  <img src={ e.strDrinkThumb } alt="" />
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
