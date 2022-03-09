import React, { useEffect, useCallback, useState } from 'react';

import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { fetIngredientsMeals } from '../../services';

function ExploreFoodsByIngredient() {
  const [data, setData] = useState([]);
  const MAX_LENGTH = 12;

  const getIngredientMeals = useCallback(async () => {
    const response = await fetIngredientsMeals();
    setData(response.meals);
  }, []);

  useEffect(() => {
    getIngredientMeals();
  }, [getIngredientMeals]);
  return (
    <div>
      <Header title="Explore Ingredients" />
      {data.slice(0, MAX_LENGTH).map((e, i) => (
        <Card
          key={ e.idIngredient }
          index={ i }
          type="ingredient"
          src={ `https://www.themealdb.com/images/ingredients/${e.strIngredient.replace(' ', '%20')}.png` }
          titleCard={ e.strIngredient }
        />
      ))}
      <Footer />
    </div>
  );
}

export default ExploreFoodsByIngredient;
