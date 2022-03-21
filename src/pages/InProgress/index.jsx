import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import clipBoard from 'clipboard-copy';

import { useLogin,
  useIngretientes,
  useUpdateInProgress,
  useUpdateDoneRecipe,
  useUpdateFavoriteRecipe,
} from '../../hooks';
import { ID_ENPOINT } from '../../services';
import { setFoodAndDrinks,
  setInProgressRecipes } from '../../redux/actions';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import InputCheck from '../../components/InputCheck';
import handleData from '../../helper';

export default function InProgress() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const mealsOrDrinks = pathname.split('/')[1] === 'foods' ? 'meals' : 'drinks';
  const { responseFoodAndDrinks, favoriteRecipes } = useSelector((state) => state);

  const { get, name, strCategory, objFavorites, rota, strThumb,
    strInstructions, strTitle, tags } = handleData(responseFoodAndDrinks)[mealsOrDrinks];

  const { verifyLogin } = useLogin();
  const { addDoneRecipe } = useUpdateDoneRecipe();
  const { newProgress, storage } = useUpdateInProgress(name);
  const { addFavoriteRecipe, removeFavoriteRecipe } = useUpdateFavoriteRecipe();

  const [ingredientes, quantities] = useIngretientes(responseFoodAndDrinks[0]);
  const [share, setShare] = useState('share');
  const [isFavorite, setIsFavorite] = useState(favoriteRecipes.some((e) => e.id === id));

  const setFoodAndDrink = useCallback(async () => {
    dispatch(setFoodAndDrinks(await get(`${ID_ENPOINT}${id}`)));
  }, [dispatch, id, get]);

  useEffect(() => {
    verifyLogin();
    setFoodAndDrink();
  }, [setFoodAndDrink]);

  useEffect(() => {
    if (!storage[name][id]) {
      dispatch(setInProgressRecipes(name, { [id]: [] }));
      newProgress();
    }
  }, [dispatch, id, name, storage, newProgress]);

  function copyLink() {
    clipBoard(`http://localhost:3000${rota}`);
    setShare('Link copied!');
  }

  async function setFavorite() {
    setIsFavorite(!isFavorite);

    if (isFavorite) {
      await removeFavoriteRecipe(id);
    } else {
      await addFavoriteRecipe(objFavorites);
    }
  }

  function handleFinishRecipe() {
    const { type, nationality, category, alcoholicOrNot, image } = objFavorites;
    const doneDate = new Date().toLocaleDateString();

    const recipeObj = {
      id: objFavorites.id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name: objFavorites.name,
      image,
      doneDate,
      tags,
      destiny: name,
    };

    addDoneRecipe(recipeObj);

    history.push('/done-recipes');
  }

  return (
    <div>
      <section>
        {responseFoodAndDrinks[0] && (
          <>
            <section className="container-img">
              <img
                data-testid="recipe-photo"
                src={ responseFoodAndDrinks[0][strThumb] }
                alt=""
              />
              <div>
                <div>
                  <h1 data-testid="recipe-title">{responseFoodAndDrinks[0][strTitle]}</h1>
                  <h3
                    data-testid="recipe-category"
                  >
                    {responseFoodAndDrinks[0][strCategory]}
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
                    type="image"
                    data-testid="favorite-btn"
                    onClick={ setFavorite }
                    alt="finish recipe"
                    src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  />
                </div>
              </div>
            </section>
            <section className="ingredients-container">
              <h3>Ingredients</h3>
              <ul>
                {ingredientes.map((e, i) => (
                  <li key={ i }>
                    <InputCheck
                      text={ `${e[1]} ${quantities[i][1]}` }
                      index={ i }
                    />
                  </li>
                ))}
              </ul>
            </section>
            <section
              className="instructions-container"
              style={ { marginBottom: '60px' } }
            >
              <h3>Instructions</h3>
              <p
                data-testid="instructions"
              >
                { responseFoodAndDrinks[0][strInstructions]}
              </p>
            </section>
          </>
        )}
        <button
          type="button"
          className="continueAndStart-btn"
          data-testid="finish-recipe-btn"
          disabled={ storage[name][id]
            ? storage[name][id].length !== ingredientes.length : null }
          onClick={ () => handleFinishRecipe() }
        >
          Finish Recipe
        </button>
      </section>
    </div>
  );
}
