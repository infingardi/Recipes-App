import React from 'react';

import { useDispatch } from 'react-redux';
import { getDrink, BASE_DRINKS } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';

export default function CategoryAllDrinks() {
  const dispatch = useDispatch();
  const handleAll = async () => {
    const response = await getDrink(BASE_DRINKS);
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
