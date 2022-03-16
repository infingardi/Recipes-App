import React from 'react';

import { useDispatch } from 'react-redux';
import { getFood, BASE_MEALS } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';

export default function CategoryAllMeals() {
  const dispatch = useDispatch();
  const handleAll = async () => {
    const response = await getFood(BASE_MEALS);
    dispatch(setFoodAndDrinks(response));
  };

  return (
    <button
      type="button"
      data-testid="All-category-filter"
      onClick={ handleAll }
    >
      All
    </button>
  );
}
