export const ADD_LOGIN_TYPE = 'ADD_LOGIN';
export const ADD_FAVORITE_TYPE = 'ADD_FAVORITE';
export const ADD_DONE_TYPE = 'ADD_DONE';
export const SET_FOOD_DRINKS_TYPE = 'SET_FOOD_DRINKS';
export const SET_MEALS_CATEGORIES = 'SET_MEALS_CATEGORIES';
export const SET_DRINKS_CATEGORIES = 'SET_DRINKS_CAGEGORIES';
export const VERIFY_CATEGORY_SELECTED = 'VERIFY_CATEGORY_SELECTED';
export const REMOVE_FAVORITE_TYPE = 'REMOVE_FAVORITE';
export const ADD_PROGRESS_RECIPES_TYPE = 'ADD_PROGRESS_RECIPES';
export const VERIFY_EXPLORE_CLICK = 'VERIFY_EXPLORE_CLICK';
export const REMOVE_PROGRESS_RECIPES_TYPE = 'REMOVE_PROGRESS_RECIPES';
export const REMOVE_IN_PROGRESS_RECIPE_TYPE = 'REMOVE_IN_PROGRESS_RECIPE';

export const actionLogin = (newEmail) => ({
  type: ADD_LOGIN_TYPE,
  payload: newEmail,
});

export const actionAddFavorite = (newFavorite) => ({
  type: ADD_FAVORITE_TYPE,
  payload: newFavorite,
});

export const actionAddDone = (doneRecipe) => ({
  type: ADD_DONE_TYPE,
  payload: doneRecipe,
});

export const setFoodAndDrinks = (newResponse) => ({
  type: SET_FOOD_DRINKS_TYPE,
  payload: newResponse,
});

export const setMealsCategory = (mealsCategoryResponse) => ({
  type: SET_MEALS_CATEGORIES,
  payload: mealsCategoryResponse.meals,
});

export const setDrinksCategory = (drinksCategoryResponse) => ({
  type: SET_DRINKS_CATEGORIES,
  payload: drinksCategoryResponse.drinks,
});

export const removeFavorites = (id) => ({
  type: REMOVE_FAVORITE_TYPE,
  payload: id,
});

export const setInProgressRecipes = (destiny, newProgress, id) => ({
  type: ADD_PROGRESS_RECIPES_TYPE,
  payload: newProgress,
  destiny,
  id,
});

export const removeInProgressRecipe = (newProgress) => ({
  type: REMOVE_IN_PROGRESS_RECIPE_TYPE,
  payload: newProgress,
});

export const RemoveProgress = (destiny, newProgress) => ({
  type: REMOVE_PROGRESS_RECIPES_TYPE,
  payload: newProgress,
  destiny,
});

export function verifyExploreClick(isClickedInExplore) {
  return {
    type: VERIFY_EXPLORE_CLICK,
    payload: isClickedInExplore,
  };
}
