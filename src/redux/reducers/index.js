import {
  ADD_LOGIN_TYPE,
  SET_FOOD_DRINKS_TYPE,
  SET_SELECTED_INGREDIENT_TYPE,
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
  selectedIngredient: '',
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN_TYPE:
    return {
      ...state, user: { email: action.payload },
    };
  case SET_FOOD_DRINKS_TYPE:
    return {
      ...state, responseFoodAndDrinks: Object.values(action.payload).flat(),
    };
  case SET_SELECTED_INGREDIENT_TYPE:
    return {
      ...state,
      selectedIngredient: action.payload,
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
