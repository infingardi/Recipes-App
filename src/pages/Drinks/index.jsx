import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header';
// import BtnCategory from '../../components/BtnCategory';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import { fetDrinks } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';

function Drinks() {
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const selectedIngredient1 = useSelector(({ selectedIngredient }) => selectedIngredient);
  const MAX_LENGTH = 12;

  const dispatch = useDispatch();

  const getDrinks = useCallback(async () => {
    const response = await fetDrinks(selectedIngredient1);
    dispatch(setFoodAndDrinks(response));
  }, [dispatch]);

  useEffect(() => {
    getDrinks();
  }, [getDrinks]);

  return (
    <section>
      <Header title="Drinks" search />
      {data.slice(0, MAX_LENGTH).map((e, i) => (
        <Card
          key={ e.idDrink }
          index={ i }
          type="recipe"
          src={ e.strDrinkThumb }
          titleCard={ e.strDrink }
        />
      ))}
      <Footer />
    </section>
  );
}

export default Drinks;
