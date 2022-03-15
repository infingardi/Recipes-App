import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
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
import './index.css';

function Foods() {
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const verify = useSelector(({ isClickedInExplore }) => isClickedInExplore);
  const verifyRef = useRef(verify);
  const btnCategories = useSelector(({ mealsCategoryResponse }) => mealsCategoryResponse);
  const history = useHistory();
  const MAX_LENGTH = 12;
  const MAX_LENGTH_CATEGORIES = 5;

  const dispatch = useDispatch();

  const getMeals = useCallback(async () => {
    const response = await fetMeals();
    dispatch(setFoodAndDrinks(response));
  }, [dispatch]);

  const verifyRedirect = () => { // verifica se ele foi redirecionado pela pagina de explore
    if (!verifyRef.current) { // caso tenha sido ele não ira fazer uma nova requisição a API
      getMeals();
    } else {
      dispatch(verifyExploreClick(false));
    }
  };

  useEffect(verifyRedirect, [dispatch, getMeals]);

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
      <section className="main-screen-container">
        {btnCategories.slice(0, MAX_LENGTH_CATEGORIES).map((category, index) => (
          <CategoryBtnMeals
            key={ index }
            index={ index }
            categoryName={ category.strCategory }
          />
        ))}
      </section>
      <section className="cards-container">
        {data.slice(0, MAX_LENGTH).map((e, i) => (
          <Card
            key={ `${e.idMeal}${Math.random()}` }
            index={ i }
            type="recipe"
            src={ e.strMealThumb }
            titleCard={ e.strMeal }
            onClick={ () => history.push(`/foods/${e.idMeal}`) }
          />
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default Foods;
