import React, { useEffect, useState, useCallback } from 'react';

import { useLogin } from '../../hooks';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RedirectButton from '../../components/RedirectButton';

import { getFood, ENDPOINT_SURPRISE_ME } from '../../services';

function ExploreFoods() {
  const { verifyLogin } = useLogin();

  const [id, setId] = useState('0');
  const getRandomMeal = useCallback(async () => {
    const response = await getFood(ENDPOINT_SURPRISE_ME);
    setId(response.meals[0].idMeal);
  }, []);

  useEffect(() => {
    verifyLogin();
    getRandomMeal();
  }, [getRandomMeal]);

  return (
    <div>
      <Header title="Explore Foods" />
      <main style={ { display: 'flex' } }>
        <RedirectButton
          dataTest="explore-by-ingredient"
          titleBtn="By Ingredient"
          path="/explore/foods/ingredients"
        />

        <RedirectButton
          dataTest="explore-by-nationality"
          titleBtn="By Nationality"
          path="/explore/foods/nationalities"
        />

        <RedirectButton
          dataTest="explore-surprise"
          titleBtn="Surprise me!"
          path={ `/foods/${id}` }
        />

      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
