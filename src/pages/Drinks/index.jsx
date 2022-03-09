import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import { fetDrinks, fetDrinksCategories } from '../../services';
import { setFoodAndDrinks, setDrinksCategory } from '../../redux/actions';
import CategoryBtnDrinks from '../../components/CategoryBtnDrinks';

function Drinks() {
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const btnCategories = useSelector(
    ({ drinksCategoryResponse }) => drinksCategoryResponse,
  );
  const MAX_LENGTH = 12;
  const MAX_LENGTH_CATEGORIES = 5;

  const dispatch = useDispatch();

  const getDrinks = useCallback(async () => {
    const response = await fetDrinks();
    dispatch(setFoodAndDrinks(response));
  }, [dispatch]);

  useEffect(() => {
    getDrinks();
  }, [getDrinks]);

  const getCategoryDrinks = useCallback(async () => {
    const response = await fetDrinksCategories();
    console.log(response);
    // console.log('RESPONSEapiCategories');
    dispatch(setDrinksCategory(response));
  }, [dispatch]);

  useEffect(() => {
    getCategoryDrinks();
  }, [getCategoryDrinks]);

  return (
    <section>
      <Header title="Drinks" search />
      {
        btnCategories.slice(0, MAX_LENGTH_CATEGORIES).map((category, index) => (
          <CategoryBtnDrinks
            key={ index.length }
            categoryName={ category.strCategory }
          />
        ))
      }
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
