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
  REMOVE_IN_PROGRESS_RECIPE_TYPE,
} from '../actions';
import INITIAL_STATE from './INITIAL_STATE';

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN_TYPE:
    return {
      ...state,
      user: { email: action.payload.email },
      doneRecipes: action.payload.doneRecipes,
      favoriteRecipes: action.payload.favoriteRecipes,
      inProgressRecipes: action.payload.inProgressRecipes,
    };
  case SET_FOOD_DRINKS_TYPE:
    return { ...state, responseFoodAndDrinks: Object.values(action.payload).flat() };
  case SET_MEALS_CATEGORIES:
    return { ...state, mealsCategoryResponse: action.payload };
  case SET_DRINKS_CATEGORIES:
    return { ...state, drinksCategoryResponse: action.payload };
  case ADD_FAVORITE_TYPE:
    return { ...state, favoriteRecipes: [...state.favoriteRecipes, action.payload] };
  case REMOVE_FAVORITE_TYPE:
    return { ...state,
      favoriteRecipes: state.favoriteRecipes.filter((e) => e.id !== action.payload),
    };
  case VERIFY_EXPLORE_CLICK:
    return { ...state, isClickedInExplore: action.payload };
  case ADD_DONE_TYPE:
    return { ...state,
      doneRecipes: [...state.doneRecipes, { ...action.payload, id: action.payload.id }],
    };
  case ADD_PROGRESS_RECIPES_TYPE:
    return { ...state,
      inProgressRecipes: { ...state.inProgressRecipes,
        [action.destiny]: {
          ...state.inProgressRecipes[action.destiny],
          ...action.payload,
        },
      },
    };
  case REMOVE_PROGRESS_RECIPES_TYPE:
    return { ...state,
      inProgressRecipes: { ...state.inProgressRecipes,
        [action.destiny]: {
          ...state.inProgressRecipes[action.destiny], ...action.payload,
        } },
    };
  case REMOVE_IN_PROGRESS_RECIPE_TYPE:
    return { ...state, inProgressRecipes: action.payload };
  default:
    return state;
  }
};

export default rootReducer;
