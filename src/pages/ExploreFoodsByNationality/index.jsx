import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useLogin } from '../../hooks';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import {
  getFood,
  ENDPOINT_LIST_ALL_NATIONALITIES,
  SEARCH_ENDPOINT,
  ENDPOINT_BY_NATIONALITY,
} from '../../services';

function ExploreFoodsByNationality() {
  const MAX_LENGTH = 12;
  const history = useHistory();

  const { verifyLogin } = useLogin();

  const [selectedNationality, setSelectedNationality] = useState('All');
  const [allNationalities, setAllNationalities] = useState([]);
  const [allMealsByNationality, setAllMealsByNationality] = useState([]);

  const getAllNatiolaities = async () => {
    const { meals } = await getFood(ENDPOINT_LIST_ALL_NATIONALITIES);

    setAllNationalities(meals);
  };

  const getAllMealsByNationality = useCallback(async () => {
    if (selectedNationality === 'All') {
      const { meals } = await getFood(SEARCH_ENDPOINT);
      setAllMealsByNationality(meals);
      return;
    }
    const { meals } = await getFood(`${ENDPOINT_BY_NATIONALITY}${selectedNationality}`);

    setAllMealsByNationality(meals);
  }, [selectedNationality]);

  const renderAllNationalities = () => {
    const allOptions = [{ strArea: 'All' }, ...allNationalities];
    return (
      allOptions.map(({ strArea }, index) => (
        <option
          key={ index }
          value={ strArea }
          data-testid={ `${strArea}-option` }
        >
          { strArea }
        </option>
      ))
    );
  };

  const handleClick = async (meal) => {
    history.push(`/foods/${meal.idMeal}`);
  };

  const renderAllMealsByNationality = () => (
    allMealsByNationality.slice(0, MAX_LENGTH)
      .map((meal, index) => (
        <Card
          key={ meal.idMeal }
          index={ index }
          type="recipe"
          src={ meal.strMealThumb }
          titleCard={ meal.strMeal }
          onClick={ () => handleClick(meal) }
        />
      ))
  );

  useEffect(() => {
    verifyLogin();
    getAllNatiolaities();
  }, []);

  useEffect(() => {
    getAllMealsByNationality();
  }, [getAllMealsByNationality, selectedNationality]);

  return (
    <div>
      <Header title="Explore Nationalities" search />

      <main>
        <section>
          <label htmlFor="nationality">
            <select
              style={ { width: '100%', backgroundColor: 'rgb(255 235 235)' } }
              name="nationality"
              id="nationality"
              data-testid="explore-by-nationality-dropdown"
              onChange={ ({ target }) => setSelectedNationality(target.value) }
            >
              { renderAllNationalities() }
            </select>
          </label>
        </section>

        <section
          style={ {
            display: 'flex',
            flexWrap: 'wrap',
          } }
        >
          {renderAllMealsByNationality()}
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default ExploreFoodsByNationality;
