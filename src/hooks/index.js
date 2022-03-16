import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionAddDone, removeInProgressRecipe } from '../redux/actions';

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

  function addCheck(value) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...storage,
      [destiny]: { ...storage[destiny],
        [id]: [...storage[destiny][id], value] } }));
  }

  function removeCheck(value) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ ...storage,
      [destiny]: { ...storage[destiny],
        [id]: storage[destiny][id].filter((f) => f !== value) } }));
  }

  function newProgress() {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...storage, [destiny]: { ...storage[destiny], [id]: [] },
    }));
  }
  return { addCheck, removeCheck, newProgress, storage };
}
// outro push

export function useUpdateDoneRecipe() {
  const dispatch = useDispatch();
  const allDoneRecipes = useSelector(({ doneRecipes }) => doneRecipes);
  const allRecipesInProgress = useSelector(({ inProgressRecipes }) => inProgressRecipes);

  function addDoneRecipe(doneRecipe) {
    delete allRecipesInProgress[doneRecipe.destiny][doneRecipe.id];

    dispatch(actionAddDone(doneRecipe));
    dispatch(removeInProgressRecipe(allRecipesInProgress));

    localStorage.setItem('doneRecipes', JSON.stringify([...allDoneRecipes, doneRecipe]));
    localStorage.setItem('inProgressRecipes', JSON.stringify(allRecipesInProgress));
  }

  return { addDoneRecipe };
}
