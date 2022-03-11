import { getDrink, getFood } from '../services';

export default (response = [{}]) => ({
  meals: {
    name: 'meals',
    rota: `/foods/${response[0].idMeal}`,
    strThumb: 'strMealThumb',
    strTitle: 'strMeal',
    strCategory: 'strCategory',
    strInstructions: 'strInstructions',
    get: getFood,
    objFavorites: {
      id: response[0].idMeal,
      type: 'food',
      nationality: response[0].strArea,
      category: response[0].strCategory,
      alcoholicOrNot: '',
      name: response[0].strMeal,
      image: response[0].strMealThumb,
    },
  },
  drinks: {
    name: 'cocktails',
    rota: `/drinks/${response[0].idDrink}`,
    strThumb: 'strDrinkThumb',
    strTitle: 'strDrink',
    strCategory: 'strAlcoholic',
    strInstructions: 'strInstructions',
    get: getDrink,
    objFavorites: {
      id: response[0].idDrink,
      type: 'drink',
      nationality: '',
      category: response[0].strCategory,
      alcoholicOrNot: response[0].strAlcoholic,
      name: response[0].strDrink,
      image: response[0].strDrinkThumb,
    },
  },
});
