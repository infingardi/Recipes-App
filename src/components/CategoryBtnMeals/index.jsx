import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { setFoodAndDrinks } from '../../redux/actions';
import { fetAllMealsByCategory } from '../../services';

export default function CategoryBtnMeals({ index, categoryName }) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const data = await fetAllMealsByCategory(categoryName);
    dispatch(setFoodAndDrinks(data));
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
