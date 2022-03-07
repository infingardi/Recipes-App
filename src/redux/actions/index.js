export const ADD_LOGIN_TYPE = 'ADD_LOGIN';
export const ADD_FAVORITE_TYPE = 'ADD_FAVORITE';
export const ADD_DONE_TYPE = 'ADD_DONE';

export function actionLogin() {
  return {
    type: ADD_LOGIN_TYPE,
  };
}

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
