import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { setFoodAndDrinks } from '../../redux/actions';
import { fetAllMealsByCategory, fetMeals } from '../../services';

export default function CategoryBtnMeals({ categoryName }) {
  const [verify, setVerify] = useState(true);
  const dispatch = useDispatch();
  const handleClick = async () => {
    if (verify) {
      const data = await fetAllMealsByCategory(categoryName);
      dispatch(setFoodAndDrinks(data));
      setVerify(false);
    } else {
      const response = await fetMeals();
      dispatch(setFoodAndDrinks(response));
    }
  };

  return (
    <button
      type="button"
      data-testid={ `${categoryName}-category-filter` }
      onClick={ handleClick }
      style={ { flex: '1', background: 'rgb(255 235 235)' } }
    >
      { categoryName }
    </button>
  );
}

CategoryBtnMeals.propTypes = {
  categoryName: PropTypes.string,
  index: PropTypes.string,
}.isRequired;
