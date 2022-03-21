import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useLogin } from '../../hooks';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import CategoryBtnDrinks from '../../components/CategoryBtnDrinks';
import { getDrink, SEARCH_ENDPOINT, ENDPOINT_LIST_CATEGORIES } from '../../services';
import {
  setFoodAndDrinks,
  setDrinksCategory,
  verifyExploreClick,
} from '../../redux/actions';

function Drinks() {
  const MAX_LENGTH = 12;
  const MAX_LENGTH_CATEGORIES = 5;
  const history = useHistory();
  const dispatch = useDispatch();

  const { verifyLogin } = useLogin();
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const verify = useSelector(({ isClickedInExplore }) => isClickedInExplore);
  const verifyRef = useRef(verify);
  const btnCategories = useSelector(
    ({ drinksCategoryResponse }) => drinksCategoryResponse,
  );

  const getDrinks = useCallback(async () => {
    // const response = await fetDrinks();
    const response = await getDrink(SEARCH_ENDPOINT);
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
    const response = await getDrink(ENDPOINT_LIST_CATEGORIES);

    dispatch(setDrinksCategory(response));
  }, [dispatch]);

  useEffect(() => {
    verifyLogin();
    getCategoryDrinks();
  }, [getCategoryDrinks]);

  return (
    <section>
      <Header title="Drinks" search />
      <section className="main-screen-container">
        {btnCategories.slice(0, MAX_LENGTH_CATEGORIES).map((category, index) => (
          <CategoryBtnDrinks
            key={ index }
            index={ index }
            categoryName={ category.strCategory }
          />
        ))}
      </section>
      <section className="cards-container">
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
      </section>
      <Footer />
    </section>
  );
}

export default Drinks;
