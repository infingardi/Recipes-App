import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLogin } from '../../hooks';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Header from '../../components/Header';
import {
  getDrink,
  ENDPOINT_LIST_ALL_INGREDIENTS,
  ENDPOINT_BY_INGREDIENT,
} from '../../services';
import { setFoodAndDrinks, verifyExploreClick } from '../../redux/actions';

function ExploreDrinksByIngredient() {
  const MAX_LENGTH = 12;
  const history = useHistory();
  const dispatch = useDispatch();

  const { verifyLogin } = useLogin();
  const [data, setData] = useState([]);
  const getIngredientDrinks = useCallback(async () => {
    const response = await getDrink(ENDPOINT_LIST_ALL_INGREDIENTS);
    setData(response.drinks);
  }, []);

  const handleClick = async (ingredient) => {
    const allDrinks = await getDrink(`${ENDPOINT_BY_INGREDIENT}${ingredient}`);
    dispatch(setFoodAndDrinks(allDrinks));
    dispatch(verifyExploreClick(true));

    history.push('/drinks');
  };

  useEffect(() => {
    verifyLogin();
    getIngredientDrinks();
  }, [getIngredientDrinks]);

  return (
    <div>
      <Header title="Explore Ingredients" />
      <section className="cards-container">
        {data.slice(0, MAX_LENGTH).map((e, i) => (
          <Card
            key={ e.strIngredient1 }
            index={ i }
            type="ingredient"
            src={ `https://www.thecocktaildb.com/images/ingredients/${e.strIngredient1}-Small.png` }
            titleCard={ e.strIngredient1 }
            onClick={ () => handleClick(e.strIngredient1) }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredient;
