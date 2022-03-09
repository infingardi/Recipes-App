import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../components/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { fetMeals } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';

function Foods() {
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const selectedIngredient1 = useSelector(({ selectedIngredient }) => selectedIngredient);
  const MAX_LENGTH = 12;
  const dispatch = useDispatch();

  const getMeals = useCallback(async () => {
    const response = await fetMeals(selectedIngredient1);
    dispatch(setFoodAndDrinks(response));
  }, [dispatch]);

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  return (
    <section>
      <Header title="Foods" search />
      {data.slice(0, MAX_LENGTH).map((e, i) => (
        <Card
          key={ e.idMeal }
          index={ i }
          type="recipe"
          src={ e.strMealThumb }
          titleCard={ e.strMeal }
        />
      ))}
      <Footer />
    </section>
  );
}

export default Foods;
