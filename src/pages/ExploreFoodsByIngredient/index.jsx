import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLogin } from '../../hooks';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Header from '../../components/Header';
import {
  getFood,
  ENDPOINT_LIST_ALL_INGREDIENTS,
  ENDPOINT_BY_INGREDIENT,
} from '../../services';
import { setFoodAndDrinks, verifyExploreClick } from '../../redux/actions';

function ExploreFoodsByIngredient() {
  const MAX_LENGTH = 12;
  const history = useHistory();
  const dispatch = useDispatch();

  const { verifyLogin } = useLogin();
  const [data, setData] = useState([]);
  const getIngredientMeals = useCallback(async () => {
    const response = await getFood(ENDPOINT_LIST_ALL_INGREDIENTS);
    setData(response.meals);
  }, []);

  const handleClick = async (ingredient) => {
    const allMeals = await getFood(`${ENDPOINT_BY_INGREDIENT}${ingredient}`);
    dispatch(setFoodAndDrinks(allMeals));
    dispatch(verifyExploreClick(true));

    history.push('/foods');
  };

  useEffect(() => {
    verifyLogin();
    getIngredientMeals();
  }, [getIngredientMeals]);

  return (
    <div>
      <Header title="Explore Ingredients" />
      <section className="cards-container">
        {data.slice(0, MAX_LENGTH).map((e, i) => (
          <Card
            key={ e.idIngredient }
            index={ i }
            type="ingredient"
            src={ `https://www.themealdb.com/images/ingredients/${e.strIngredient}-Small.png` }
            titleCard={ e.strIngredient }
            onClick={ () => handleClick(e.strIngredient) }
          />))}
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoodsByIngredient;
