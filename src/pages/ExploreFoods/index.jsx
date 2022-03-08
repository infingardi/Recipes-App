import React from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RedirectButton from '../../components/RedirectButton';

function ExploreFoods() {
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
          path="/explore/foods/nationalities"
        />

      </main>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
