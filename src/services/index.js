const BASE_FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

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

// export const getAllfoods = async () => {
//   const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php')).json();
//   return data;
// };
