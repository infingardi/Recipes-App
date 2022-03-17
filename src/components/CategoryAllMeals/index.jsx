import React from 'react';

import { useDispatch } from 'react-redux';
import { fetMeals } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';

export default function CategoryAllMeals() {
  const dispatch = useDispatch();
  const handleAll = async () => {
    const response = await fetMeals();
    dispatch(setFoodAndDrinks(response));
  };

  return (
    <button
      className="btnCategory"
      type="button"
      data-testid="All-category-filter"
      onClick={ handleAll }
    >
      All
    </button>
  );
}
