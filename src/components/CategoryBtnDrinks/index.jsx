import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { fetAllDrinksByCategory } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';

export default function CategoryBtnDrinks({ index, categoryName }) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const data = await fetAllDrinksByCategory(categoryName);
    dispatch(setFoodAndDrinks(data));
  };

  return (
    <section className="btn-category">
      <button
        type="button"
        key={ index }
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
