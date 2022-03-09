export const ADD_LOGIN_TYPE = 'ADD_LOGIN';
export const ADD_FAVORITE_TYPE = 'ADD_FAVORITE';
export const ADD_DONE_TYPE = 'ADD_DONE';
export const SET_FOOD_DRINKS_TYPE = 'SET_FOOD_DRINKS';

export const actionLogin = (newEmail) => ({
  type: ADD_LOGIN_TYPE,
  payload: newEmail,
});

export function actionAddFavorite() {
  return {
    type: ADD_FAVORITE_TYPE,
  };
}

export const actionAddDone = (doneRecipe) => ({
  type: ADD_DONE_TYPE,
  payload: doneRecipe,
});

export const setFoodAndDrinks = (newResponse) => ({
  type: SET_FOOD_DRINKS_TYPE,
  payload: newResponse,
});
