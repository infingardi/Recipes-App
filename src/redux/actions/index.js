export const ADD_LOGIN_TYPE = 'ADD_LOGIN';
export const ADD_FAVORITE_TYPE = 'ADD_FAVORITE';
export const ADD_DONE_TYPE = 'ADD_DONE';
export const SET_FOOD_DRINKS_TYPE = 'SET_FOOD_DRINKS';
export const SET_MEALS_CATEGORIES = 'SET_MEALS_CATEGORIES';
export const SET_DRINKS_CATEGORIES = 'SET_DRINKS_CAGEGORIES';
export const VERIFY_EXPLORE_CLICK = 'VERIFY_EXPLORE_CLICK';

export const actionLogin = (newEmail) => ({
  type: ADD_LOGIN_TYPE,
  payload: newEmail,
});

export function actionAddFavorite() {
  return {
    type: ADD_FAVORITE_TYPE,
  };
}

export function actionAddDone() {
  return {
    type: ADD_DONE_TYPE,
  };
}

export const setFoodAndDrinks = (newResponse) => ({
  type: SET_FOOD_DRINKS_TYPE,
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

export function verifyExploreClick(isClickedInExplore) {
  return {
    type: VERIFY_EXPLORE_CLICK,
    payload: isClickedInExplore,
  };
}
