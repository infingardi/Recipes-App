import React, { useEffect, useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { getDrink, LIST_ALL_INGREDIENTS_DRINKS } from '../../services';
import { setFoodAndDrinks, verifyExploreClick } from '../../redux/actions';

function ExploreDrinksByIngredient() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const MAX_LENGTH = 12;

  const getIngredientDrinks = useCallback(async () => {
    const response = await getDrink(LIST_ALL_INGREDIENTS_DRINKS);
    setData(response.drinks);
  }, []);

  const handleClick = async (ingredient) => {
    const allDrinks = await getDrink(`filter.php?i=${ingredient}`);
    dispatch(setFoodAndDrinks(allDrinks));
    dispatch(verifyExploreClick(true));

    history.push('/drinks');
  };

  useEffect(() => {
    getIngredientDrinks();
  }, [getIngredientDrinks]);

  return (
    <div>
      <Header title="Explore Ingredients" />
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
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredient;
