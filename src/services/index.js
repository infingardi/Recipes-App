const BASE_FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const BASE_MEALS = 'search.php?s=';
export const BASE_DRINKS = 'search.php?s=';
export const BASE_MEALS_BY_CATEGORY = 'filter.php?c=';
export const BASE_DRINKS_BY_CATEGORY = 'filter.php?c=';
export const BASE_MEALS_CATEGORY = 'list.php?c=list';
export const BASE_DRINKS_CATEGORY = 'list.php?c=list';
export const SURPRISE_ME_MEAL = 'random.php';
export const SURPRISE_ME_DRINKS = 'random.php';
export const LIST_ALL_INGREDIENTS_MEAL = 'list.php?i=list';
export const LIST_ALL_INGREDIENTS_DRINKS = 'list.php?i=list';

export const getFood = async (endpoint) => {
  const response = await fetch(`${BASE_FOOD_URL}${endpoint}`);
  const data = await response.json();

  return data;
};

export const getDrink = async (endpoint) => {
  const response = await fetch(`${BASE_DRINK_URL}${endpoint}`);
  const data = await response.json();

  return data;
};

export const fetchFoodsOrDrinks = {
  foods: getFood,
  drinks: getDrink,
};
