import React from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RedirectButton from '../../components/RedirectButton';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explore Drinks" />
      <main>
        <RedirectButton
          dataTest="explore-by-ingredient"
          titleBtn="By Ingredient"
          path="/explore/drinks/ingredients"
        />

        <RedirectButton
          dataTest="explore-surprise"
          titleBtn="Surprise me!"
          path="/explore/drinks/ingredients"
        />

      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
