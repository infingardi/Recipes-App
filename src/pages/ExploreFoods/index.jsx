import React, { useEffect, useState, useCallback } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RedirectButton from '../../components/RedirectButton';

import { fetSurpriseMeMeals } from '../../services';

function ExploreFoods() {
  const [id, setId] = useState('0');
  const getRandomMeal = useCallback(async () => {
    const response = await fetSurpriseMeMeals();
    setId(response.meals[0].idMeal);
  }, []);

  useEffect(() => {
    getRandomMeal();
  }, [getRandomMeal]);

  return (
    <div>
      <Header title="Explore Foods" />
      <main>
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
