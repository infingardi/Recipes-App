import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import CategoryBtnDrinks from '../../components/CategoryBtnDrinks';
import { getDrink, BASE_DRINKS, BASE_DRINKS_CATEGORY } from '../../services';
import {
  setFoodAndDrinks,
  setDrinksCategory,
  verifyExploreClick,
} from '../../redux/actions';
import CategoryAllDrinks from '../../components/CategoryAllDrinks';

function Drinks() {
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const verify = useSelector(({ isClickedInExplore }) => isClickedInExplore);
  const verifyRef = useRef(verify);
  const history = useHistory();
  const btnCategories = useSelector(
    ({ drinksCategoryResponse }) => drinksCategoryResponse,
  );
  const MAX_LENGTH = 12;
  const MAX_LENGTH_CATEGORIES = 5;

  const dispatch = useDispatch();

  const getDrinks = useCallback(async () => {
    // const response = await fetDrinks();
    const response = await getDrink(BASE_DRINKS);
    dispatch(setFoodAndDrinks(response));
  }, [dispatch]);

  const verifyRedirect = () => { // verifica se ele foi redirecionado pela pagina de explore
    if (!verifyRef.current) { // caso tenha sido ele não ira fazer uma nova requisição a API
      getDrinks();
    } else {
      dispatch(verifyExploreClick(false));
    }
  };

  useEffect(verifyRedirect, [dispatch, getDrinks]);
  const getCategoryDrinks = useCallback(async () => {
    const response = await getDrink(BASE_DRINKS_CATEGORY);

    dispatch(setDrinksCategory(response));
  }, [dispatch]);

  useEffect(() => {
    getCategoryDrinks();
  }, [getCategoryDrinks]);

  return (
    <section>
      <Header title="Drinks" search />
      <CategoryAllDrinks />
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
          onClick={ () => history.push(`/drinks/${e.idDrink}`) }
        />
      ))}
      <Footer />
    </section>
  );
}

export default Drinks;
