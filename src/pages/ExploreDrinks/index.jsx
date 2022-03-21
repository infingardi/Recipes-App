import React, { useEffect, useState, useCallback } from 'react';

import { useLogin } from '../../hooks';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RedirectButton from '../../components/RedirectButton';
import { getDrink, ENDPOINT_SURPRISE_ME } from '../../services';

function ExploreDrinks() {
  const { verifyLogin } = useLogin();
  const [id, setId] = useState('0');
  const getRandomDrink = useCallback(async () => {
    const response = await getDrink(ENDPOINT_SURPRISE_ME);
    setId(response.drinks[0].idDrink);
  }, []);

  useEffect(() => {
    verifyLogin();
    getRandomDrink();
  }, [getRandomDrink]);
  return (
    <div>
      <Header title="Explore Drinks" />
      <main style={ { display: 'flex' } }>
        <RedirectButton
          dataTest="explore-by-ingredient"
          titleBtn="By Ingredient"
          path="/explore/drinks/ingredients"
        />

        <RedirectButton
          dataTest="explore-surprise"
          titleBtn="Surprise me!"
          path={ `/drinks/${id}` }
        />

      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
