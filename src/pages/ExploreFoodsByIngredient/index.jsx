import React, { useEffect, useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import Header from '../../components/Header';
import { fetIngredientsMeals, getFood } from '../../services';
import { setFoodAndDrinks, verifyExploreClick } from '../../redux/actions';

function ExploreFoodsByIngredient() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const MAX_LENGTH = 12;

  const getIngredientMeals = useCallback(async () => {
    const response = await fetIngredientsMeals();
    setData(response.meals);
  }, []);

  const handleClick = async (ingredient) => {
    const allMeals = await getFood(`filter.php?i=${ingredient}`);
    dispatch(setFoodAndDrinks(allMeals));
    dispatch(verifyExploreClick(true));

    history.push('/foods');
  };

  useEffect(() => {
    getIngredientMeals();
  }, [getIngredientMeals]);

  return (
    <div>
      <Header title="Explore Ingredients" />
      {data.slice(0, MAX_LENGTH).map((e, i) => {
        console.log(e);
        return (<Card
          key={ e.idIngredient }
          index={ i }
          type="ingredient"
          src={ `https://www.themealdb.com/images/ingredients/${e.strIngredient}-Small.png` }
          titleCard={ e.strIngredient }
          onClick={ handleClick }
        />);
      })}
      <Footer />
    </div>
  );
}

export default ExploreFoodsByIngredient;
