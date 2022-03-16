import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { setFoodAndDrinks } from '../../redux/actions';
import { getFood, BASE_MEALS_BY_CATEGORY, BASE_MEALS } from '../../services';

export default function CategoryBtnMeals({ index, categoryName }) {
  const [verify, setVerify] = useState(true);
  const dispatch = useDispatch();
  const handleClick = async () => {
    if (verify) {
      const data = await getFood(`${BASE_MEALS_BY_CATEGORY}${categoryName}`);
      dispatch(setFoodAndDrinks(data));
      setVerify(false);
    } else {
      const response = await getFood(BASE_MEALS);
      dispatch(setFoodAndDrinks(response));
      setVerify(true);
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

CategoryBtnMeals.propTypes = {
  categoryName: PropTypes.string,
  index: PropTypes.string,
}.isRequired;
