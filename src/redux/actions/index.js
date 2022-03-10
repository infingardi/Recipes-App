export const ADD_LOGIN_TYPE = 'ADD_LOGIN';
export const ADD_FAVORITE_TYPE = 'ADD_FAVORITE';
export const ADD_DONE_TYPE = 'ADD_DONE';
export const SET_FOOD_DRINKS_TYPE = 'SET_FOOD_DRINKS';
export const SET_SELECTED_MEAL_INGREDIENT_TYPE = 'SET_SELECTED_MEAL_INGREDIENT';
export const SET_SELECTED_DRINK_INGREDIENT_TYPE = 'SET_SELECTED_DRINK_INGREDIENT';
export const SET_MEALS_CATEGORIES = 'SET_MEALS_CATEGORIES';
export const SET_DRINKS_CATEGORIES = 'SET_DRINKS_CAGEGORIES';
export const REMOVE_FAVORITE_TYPE = 'REMOVE_FAVORITE';
export const ADD_PROGRESS_RECIPES_TYPE = 'ADD_PROGRESS_RECIPES';

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

export const setSelectedMealIngredient = (newResponse) => ({
  type: SET_SELECTED_MEAL_INGREDIENT_TYPE,
  payload: newResponse,
});

export const setSelectedDrinkIngredient = (newResponse) => ({
  type: SET_SELECTED_DRINK_INGREDIENT_TYPE,
  payload: newResponse,
});

export const setMealsCategory = (mealsCategoryResponse) => ({
  type: SET_MEALS_CATEGORIES,
  payload: mealsCategoryResponse,
});

export const setDrinksCategory = (drinksCategoryResponse) => ({
  type: SET_DRINKS_CATEGORIES,
  payload: drinksCategoryResponse,
});

export const removeFavorites = (id) => ({
  type: REMOVE_FAVORITE_TYPE,
  payload: id,
});

export const setInProgressRecipes = (destiny, newProgress) => ({
  type: ADD_PROGRESS_RECIPES_TYPE,
  payload: newProgress,
  destiny,
});
