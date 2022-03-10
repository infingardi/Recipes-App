import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../../components/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CategoryBtnMeals from '../../components/CategoryBtnMeals';

import { fetMeals, fetMealsCategories } from '../../services';
import {
  setFoodAndDrinks,
  setMealsCategory,
  verifyExploreClick,
} from '../../redux/actions';

function Foods() {
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const verify = useSelector(({ isClickedInExplore }) => isClickedInExplore);
  const btnCategories = useSelector(({ mealsCategoryResponse }) => mealsCategoryResponse);

  const MAX_LENGTH = 12;
  const MAX_LENGTH_CATEGORIES = 5;

  const dispatch = useDispatch();

  const getMeals = useCallback(async () => {
    const response = await fetMeals();
    dispatch(setFoodAndDrinks(response));
  }, [dispatch]);

  useEffect(() => { // verifica se ele foi redirecionado pela pagina de explore
    if (!verify) { // caso tenha sido ele não ira fazer uma nova requisição a API
      getMeals();
    } else {
      dispatch(verifyExploreClick(false));
    }
  }, [getMeals]);

  const getCategoryMeals = useCallback(async () => {
    const response = await fetMealsCategories();
    dispatch(setMealsCategory(response));
  }, [dispatch]);

  useEffect(() => {
    getCategoryMeals();
  }, [getCategoryMeals]);

  return (
    <section>
      <Header title="Foods" search />
      {
        btnCategories.slice(0, MAX_LENGTH_CATEGORIES).map((category, index) => (
          <CategoryBtnMeals
            key={ index }
            categoryName={ category.strCategory }
          />
        ))
      }

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
