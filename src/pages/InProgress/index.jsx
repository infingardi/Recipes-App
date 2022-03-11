import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import clipBoard from 'clipboard-copy';

import { useIngretientes, useUpdateInProgress } from '../../hooks';
import { actionAddFavorite, removeFavorites, setFoodAndDrinks,
  setInProgressRecipes } from '../../redux/actions';
import { getFood } from '../../services';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import InputCheck from '../../components/InputCheck';

export default function InProgress() {
  const { id } = useParams();
  const [share, setShare] = useState('share');
  const { newProgress, storage } = useUpdateInProgress('meals');
  const { responseFoodAndDrinks, favoriteRecipes } = useSelector((state) => state);
  const [isFavorite, setIsFavorite] = useState(favoriteRecipes.some((e) => e.id === id));
  const dispatch = useDispatch();
  const [ingredientes, quantities] = useIngretientes(responseFoodAndDrinks[0]);
  const ID_ENPOINT = 'lookup.php?i=';

  const setFood = useCallback(async () => {
    dispatch(setFoodAndDrinks(await getFood(`${ID_ENPOINT}${id}`)));
  }, [dispatch, id]);

  useEffect(() => {
    setFood();
  }, [setFood]);

  useEffect(() => {
    if (!storage.meals[id]) {
      dispatch(setInProgressRecipes('meals', { [id]: [] }));
      newProgress();
    }
  }, [dispatch, id]);

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
    if (isFavorite) {
      dispatch(removeFavorites(id));
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(favoriteRecipes.filter((f) => f.id !== id)));
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
              <div>
                {ingredientes.map((e, i) => (
                  <InputCheck
                    key={ i }
                    text={ `${e[1]} ${quantities[i][1]}` }
                    index={ i }
                  />
                ))}
              </div>
            </section>
            <section>
              <h3>Instructions</h3>
              <p
                data-testid="instructions"
              >
                { responseFoodAndDrinks[0].strInstructions}
              </p>
            </section>
          </>
        )}
        <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
      </section>
    </div>
  );
}
