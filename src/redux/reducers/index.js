import {
  ADD_LOGIN_TYPE,
  SET_FOOD_DRINKS_TYPE,
  SET_SELECTED_INGREDIENT_TYPE,
  SET_MEALS_CATEGORIES,
  SET_DRINKS_CATEGORIES,
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
  mealsCategoryResponse: [],
  drinksCategoryResponse: [],
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
    }
  case SET_MEALS_CATEGORIES:
    return {
      ...state, mealsCategoryResponse: Object.values(action.payload).flat(),
    };
  case SET_DRINKS_CATEGORIES:
    return {
      ...state, drinksCategoryResponse: Object.values(action.payload).flat(),
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
