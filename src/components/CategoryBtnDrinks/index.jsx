import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { getDrink, BASE_DRINKS_BY_CATEGORY, BASE_DRINKS } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';

export default function CategoryBtnDrinks({ index, categoryName }) {
  const [verify, setVerify] = useState(true);
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (verify) {
      // const data = await fetAllDrinksByCategory(categoryName);
      const data = await getDrink(`${BASE_DRINKS_BY_CATEGORY}${categoryName}`);
      dispatch(setFoodAndDrinks(data));
      setVerify(false);
    } else {
      const response = await getDrink(BASE_DRINKS);
      dispatch(setFoodAndDrinks(response));
    }
  };

  return (
    <section className="btn-category" key={ index }>
      <button
        type="button"
        data-testid={ `${categoryName}-category-filter` }
        onClick={ handleClick }
      >
        { categoryName }
      </button>
    </section>
  );
}

CategoryBtnDrinks.propTypes = {
  categoryName: PropTypes.string,
}.isRequired;
