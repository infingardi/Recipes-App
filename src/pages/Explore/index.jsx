import React, { useEffect } from 'react';

import { useLogin } from '../../hooks';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RedirectButton from '../../components/RedirectButton';

function Explore() {
  const { verifyLogin } = useLogin();

  useEffect(() => {
    verifyLogin();
  }, []);
  return (
    <div>
      <Header title="Explore" />
      <main style={ { display: 'flex', justifyContent: 'space-around' } }>
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
