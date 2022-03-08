import React from 'react';
import { useHistory } from 'react-router-dom';

import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Explore() {
  const { push } = useHistory();
  return (
    <div>
      <Header title="Explore" />
      <main>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default Explore;
