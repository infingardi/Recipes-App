import React from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RedirectButton from '../../components/RedirectButton';

function Explore() {
  return (
    <div>
      <Header title="Explore" />
      <main>
        <RedirectButton
          dataTest="explore-foods"
          titleBtn="Explore Foods"
          path="/explore/foods"
        />
        <RedirectButton
          dataTest="explore-drinks"
          titleBtn="Explore Drinks"
          path="/explore/drinks"
        />
      </main>
      <Footer />
    </div>
  );
}

export default Explore;
