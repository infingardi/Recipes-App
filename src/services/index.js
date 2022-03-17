const BASE_FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const SEARCH_ENDPOINT = 'search.php?s=';
export const ENDPOINT_BY_FIRST_LETTER = 'search.php?f=';
export const ENDPOINT_BY_CATEGORY = 'filter.php?c=';
export const ENDPOINT_BY_INGREDIENT = 'filter.php?i=';
export const ENDPOINT_BY_NATIONALITY = 'filter.php?a=';
export const ENDPOINT_LIST_CATEGORIES = 'list.php?c=list';
export const ENDPOINT_LIST_ALL_INGREDIENTS = 'list.php?i=list';
export const ENDPOINT_LIST_ALL_NATIONALITIES = 'list.php?a=list';
export const ENDPOINT_SURPRISE_ME = 'random.php';
export const ID_ENPOINT = 'lookup.php?i=';

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
