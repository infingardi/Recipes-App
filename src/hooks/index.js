import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import supabase from '../supabase';
import {
  actionLogin,
  actionAddDone,
  removeInProgressRecipe,
  removeFavorites, actionAddFavorite,
} from '../redux/actions';

export function useLogin() {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogin(email) {
    const TOKEN = 1;
    const { currentSession } = JSON.parse(localStorage.getItem('supabase.auth.token'))
    || [];

    const doneRecipes = currentSession?.user.user_metadata.doneRecipes || [];
    const favoriteRecipes = currentSession?.user.user_metadata.favoriteRecipes || [];
    const inProgressRecipes = currentSession?.user.user_metadata.inProgressRecipes
        || { meals: {}, cocktails: {} };

    const objLogin = {
      email,
      doneRecipes,
      favoriteRecipes,
      inProgressRecipes,
    };

    dispatch(actionLogin(objLogin));

    localStorage.setItem('mealsToken', TOKEN);
    localStorage.setItem('cocktailsToken', TOKEN);
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('doneRecipe', JSON.stringify(doneRecipes));
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  function verifyLogin() {
    const verify = JSON.parse(localStorage.getItem('supabase.auth.token')) || false;

    if (!verify) {
      history.push('/');
    }
  }

  return { handleLogin, verifyLogin };
}

export function useIngretientes(data) {
  const [ingredientes, setIngredientes] = useState([]);
  const [quantities, setQuantities] = useState([]);

  function teste(array) {
    setIngredientes(Object.entries(array)
      .filter((e) => e[0].includes('strIngredient') && e[1]));
    setQuantities(Object.entries(array).filter((e) => e[0].includes('strMeasure')));
  }

  useEffect(() => {
    if (data) { teste(data); }
  }, [data]);

  return [ingredientes, quantities];
}

export function useUpdateInProgress(destiny) {
  const { id } = useParams();
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { meals: [], cocktails: [] };

  async function addCheck(value) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...storage,
      [destiny]: { ...storage[destiny],
        [id]: [...storage[destiny][id], value] },
    }));

    await supabase.auth.update({
      data: { inProgressRecipes: {
        ...storage,
        [destiny]: { ...storage[destiny],
          [id]: [...storage[destiny][id], value] } },
      },
    });
  }

  async function removeCheck(value) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...storage,
      [destiny]: { ...storage[destiny],
        [id]: storage[destiny][id].filter((f) => f !== value) },
    }));

    await supabase.auth.update({
      data: { inProgressRecipes: {
        ...storage,
        [destiny]: { ...storage[destiny],
          [id]: storage[destiny][id].filter((f) => f !== value) } },
      },
    });
  }

  async function newProgress() {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...storage, [destiny]: { ...storage[destiny], [id]: [] },
    }));

    await supabase.auth.update({
      data: { inProgressRecipes: {
        ...storage,
        [destiny]: { ...storage[destiny], [id]: [] } },
      },
    });
  }
  return { addCheck, removeCheck, newProgress, storage };
}

export function useUpdateDoneRecipe() {
  const dispatch = useDispatch();
  const allDoneRecipes = useSelector(({ doneRecipes }) => doneRecipes);
  const allRecipesInProgress = useSelector(({ inProgressRecipes }) => inProgressRecipes);

  async function addDoneRecipe(doneRecipe) {
    delete allRecipesInProgress[doneRecipe.destiny][doneRecipe.id];

    dispatch(actionAddDone(doneRecipe));
    dispatch(removeInProgressRecipe(allRecipesInProgress));

    localStorage.setItem('doneRecipes', JSON.stringify([...allDoneRecipes, doneRecipe]));
    localStorage.setItem('inProgressRecipes', JSON.stringify(allRecipesInProgress));

    await supabase.auth.update({
      data: {
        doneRecipes: [...allDoneRecipes, doneRecipe],
        inProgressRecipes: allRecipesInProgress,
      },
    });
  }

  return { addDoneRecipe };
}

export function useUpdateFavoriteRecipe() {
  const dispatch = useDispatch();
  const allFavoriteRecipes = useSelector(({ favoriteRecipes }) => favoriteRecipes);

  async function addFavoriteRecipe(favRecipe) {
    dispatch(actionAddFavorite(favRecipe));

    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...allFavoriteRecipes, favRecipe]));

    await supabase.auth.update({
      data: { favoriteRecipes: [...allFavoriteRecipes, favRecipe] },
    });
  }

  async function removeFavoriteRecipe(id) {
    dispatch(removeFavorites(id));

    localStorage.setItem('favoriteRecipes',
      JSON.stringify(allFavoriteRecipes.filter((e) => e.id !== id)));

    await supabase.auth.update({
      data: { favoriteRecipes: allFavoriteRecipes.filter((e) => e.id !== id) },
    });
  }

  return { addFavoriteRecipe, removeFavoriteRecipe };
}
