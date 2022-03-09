import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryBtnMeals({ index, categoryName }) {
  return (
    <section className="btn-category">
      <button
        type="button"
        key={ index }
        data-testid={ `${categoryName}-category-filter` }
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
