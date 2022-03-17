import React from 'react';

import { useDispatch } from 'react-redux';
import { getDrink, SEARCH_ENDPOINT } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';

export default function CategoryAllDrinks() {
  const dispatch = useDispatch();
  const handleAll = async () => {
    const response = await getDrink(SEARCH_ENDPOINT);
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
