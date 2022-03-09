const BASE_FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const BASE_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const BASE_MEALS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const BASE_DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const BASE_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const BASE_MEALS_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const BASE_DRINKS_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const SURPRISE_ME_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const SURPRISE_ME_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const LIST_ALL_INGREDIENTS_MEAL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const LIST_ALL_INGREDIENTS_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

export const getFood = async (endpoint) => {
  const response = await fetch(`${BASE_FOOD_URL}${endpoint}`);
  const data = await response.json();

  return data;
};

export const getDrink = async () => {
  const response = await fetch(`${BASE_DRINK_URL}`);
  const data = await response.json();

  return data;
};

export const fetchFoodsOrDrinks = {
  foods: getFood,
  drinks: getDrink,
};

export const fetMeals = async () => {
  const response = await fetch(`${BASE_MEALS}`);
  const data = await response.json();

  return data;
};

export const fetAllMealsByCategory = async (endpoint) => {
  const response = await fetch(`${BASE_MEALS_BY_CATEGORY}${endpoint}`);
  const data = await response.json();

  return data;
};

export const fetAllDrinksByCategory = async (endpoint) => {
  const response = await fetch(`${BASE_DRINKS_BY_CATEGORY}${endpoint}`);
  const data = await response.json();

  return data;
};

export const fetDrinks = async () => {
  const response = await fetch(`${BASE_DRINKS}`);
  const data = await response.json();

  return data;
};

export const fetMealsCategories = async () => {
  const response = await fetch(`${BASE_MEALS_CATEGORY}`);
  const data = await response.json();

  return data;
};

export const fetDrinksCategories = async () => {
  const response = await fetch(`${BASE_DRINKS_CATEGORY}`);
  const data = await response.json();

  return data;
};

export const fetSurpriseMeMeals = async () => {
  const response = await fetch(`${SURPRISE_ME_MEAL}`);
  const data = await response.json();

  return data;
};

export const fetSurpriseMeDrinks = async () => {
  const response = await fetch(`${SURPRISE_ME_DRINKS}`);
  const data = await response.json();

  return data;
};

export const fetIngredientsMeals = async () => {
  const response = await fetch(`${LIST_ALL_INGREDIENTS_MEAL}`);
  const data = await response.json();

  return data;
};

export const fetIngredientsDrinks = async () => {
  const response = await fetch(`${LIST_ALL_INGREDIENTS_DRINKS}`);
  const data = await response.json();

  return data;
};
