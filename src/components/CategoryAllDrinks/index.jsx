import React from 'react';

import { useDispatch } from 'react-redux';
import { fetDrinks } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';

export default function CategoryAllDrinks() {
  const dispatch = useDispatch();
  const handleAll = async () => {
    const response = await fetDrinks();
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
