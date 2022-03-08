import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../../components/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import { getAllfoods } from '../../services';

function Foods() {
  const data = useSelector(({ responseFoodAndDrinks }) => responseFoodAndDrinks);
  const MAX_LENGTH = 12;
  // const history = useHistory();
  // const arrayPathname = history.location.pathname.split('/')[1];

  // useEffect(() => {
  //   if (data.length === 1 && data[0] !== null) {
  //     history.push(`/${arrayPathname}/${data[0][arrayPathname === 'foods'
  //       ? 'idMeal' : 'idDrink']}`);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   getAllfoods().then((e) => {
  //     console.log(e);
  //   });
  // }, []);

  // console.log(data.slice(0, MAX_LENGTH));

  return (
    <section>
      <Header title="Foods" search />
      {data.slice(0, MAX_LENGTH).map((e, i) => (
        <Card
          key={ e.idMeal }
          index={ i }
          src={ e.strMealThumb }
          titleCard={ e.strMeal }
        />
      ))}
      <Footer />
    </section>
  );
}

export default Foods;
