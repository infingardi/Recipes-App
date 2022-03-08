import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Footer from '../../components/Footer';

function Drinks() {
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const MAX_LENGTH = 12;

  return (
    <section>
      <Header title="Drinks" search />
      {data.slice(0, MAX_LENGTH).map((e, i) => (
        <Card
          key={ e.idDrink }
          index={ i }
          src={ e.strDrinkThumb }
          titleCard={ e.strDrink }
        />
      ))}
      <Footer />
    </section>
  );
}

export default Drinks;
