import {
  ADD_DONE_TYPE,
  ADD_LOGIN_TYPE,
  SET_FOOD_DRINKS_TYPE,
  SET_MEALS_CATEGORIES,
  SET_DRINKS_CATEGORIES,
  ADD_FAVORITE_TYPE,
  REMOVE_FAVORITE_TYPE,
  ADD_PROGRESS_RECIPES_TYPE,
  VERIFY_EXPLORE_CLICK,
  REMOVE_PROGRESS_RECIPES_TYPE,
} from '../actions';

const INITIAL_STATE = {
  user: { email: '' },
  mealsToken: 1,
  responseFoodAndDrinks: [],
  cocktailsToken: 1,
  doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')) || [],
  favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  inProgressRecipes: JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { meals: [], cocktails: [] },
  selectedMealIngredient: '',
  selectedDrinkIngredient: '',
  mealsCategoryResponse: [],
  drinksCategoryResponse: [],
  isClickedInExplore: false,
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
  case SET_MEALS_CATEGORIES:
    return {
      ...state, mealsCategoryResponse: Object.values(action.payload).flat(),
    };
  case SET_DRINKS_CATEGORIES:
    return {
      ...state, drinksCategoryResponse: Object.values(action.payload).flat(),
    };
  case ADD_FAVORITE_TYPE:
    return {
      ...state, favoriteRecipes: [...state.favoriteRecipes, action.payload],
    };
  case REMOVE_FAVORITE_TYPE:
    return {
      ...state,
      favoriteRecipes: state.favoriteRecipes.filter((e) => e.id !== action.payload),
    };
  case VERIFY_EXPLORE_CLICK:
    return { ...state, isClickedInExplore: action.payload };
  case ADD_DONE_TYPE:
    return {
      ...state,
      doneRecipes: [...state.doneRecipes, { ...action.payload, id: action.payload.id }],
    };
  case ADD_PROGRESS_RECIPES_TYPE:
    return {
      ...state,
      inProgressRecipes: { ...state.inProgressRecipes, [action.destiny]: action.payload },
    };
  case REMOVE_PROGRESS_RECIPES_TYPE:
    return {
      ...state,
      inProgressRecipes: { ...state.inProgressRecipes,
        [action.destiny]: {
          ...state.inProgressRecipes[action.destiny], ...action.payload,
        } },
    };
  default:
    return state;
  }
};

export default rootReducer;
