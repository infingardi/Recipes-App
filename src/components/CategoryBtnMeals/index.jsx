import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { setFoodAndDrinks } from '../../redux/actions';
import { fetAllMealsByCategory, fetMeals } from '../../services';
import CategoryAllMeals from '../CategoryAllMeals';
import './index.css';

export default function CategoryBtnMeals({ categoryName, index }) {
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
      setVerify(true);
    }
  };

  return (
    <>
      {index === 0 && (
        <CategoryAllMeals />
      )}
      <button
        className="btnCategory"
        type="button"
        data-testid={ `${categoryName}-category-filter` }
        onClick={ handleClick }
      >
        { categoryName }
      </button>
    </>
  );
}

CategoryBtnMeals.propTypes = {
  categoryName: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
