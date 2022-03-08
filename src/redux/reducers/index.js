import {
  ADD_LOGIN_TYPE, SET_FOOD_DRINKS_TYPE,
  // ADD_FAVORITE_TYPE,
  // ADD_DONE_TYPE
} from '../actions';

const INITIAL_STATE = {
  user: { email: '' },
  mealsToken: 1,
  responseFoodAndDrinks: [],
  cocktailsToken: 1,
  doneRecipes: [],
  favoriteRecipes: [],
  inProgressRecipes: {},
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN_TYPE:
    return {
      ...state,
    };
  case SET_FOOD_DRINKS_TYPE:
    return {
      ...state, responseFoodAndDrinks: Object.values(action.payload).flat(),
    };
  // case ADD_FAVORITE_TYPE:
  //   return {
  //     ...state,
  //   };
  // case ADD_DONE_TYPE:
  //   return {
  //     ...state,
  //   };
  default:
    return state;
  }
};

export default rootReducer;
