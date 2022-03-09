import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryBtnDrinks({ index, categoryName }) {
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

CategoryBtnDrinks.propTypes = {
  categoryName: PropTypes.string,
}.isRequired;
