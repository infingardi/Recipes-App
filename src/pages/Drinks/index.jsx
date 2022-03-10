import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import CategoryBtnDrinks from '../../components/CategoryBtnDrinks';
import { fetDrinks, fetDrinksCategories } from '../../services';
import {
  setFoodAndDrinks,
  setDrinksCategory,
  verifyExploreClick,
} from '../../redux/actions';

function Drinks() {
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const verify = useSelector(({ isClickedInExplore }) => isClickedInExplore);
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

  useEffect(() => { // verifica se ele foi redirecionado pela pagina de explore
    if (!verify) { // caso tenha sido ele não ira fazer uma nova requisição a API
      getDrinks();
    } else {
      dispatch(verifyExploreClick(false));
    }
  }, [getDrinks]);

  const getCategoryDrinks = useCallback(async () => {
    const response = await fetDrinksCategories();

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
            key={ index }
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
