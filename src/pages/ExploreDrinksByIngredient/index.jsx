import React, { useEffect, useCallback, useState } from 'react';

import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { fetIngredientsDrinks } from '../../services';

function ExploreDrinksByIngredient() {
  const [data, setData] = useState([]);
  const MAX_LENGTH = 12;

  const getIngredientDrinks = useCallback(async () => {
    const response = await fetIngredientsDrinks();
    setData(response.drinks);
  }, []);

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
          onClick={ () => console.log('oi') }
        />
      ))}
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredient;
