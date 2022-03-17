import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { getDrink, ENDPOINT_BY_CATEGORY, SEARCH_ENDPOINT } from '../../services';
import { setFoodAndDrinks } from '../../redux/actions';
import CategoryAllDrinks from '../CategoryAllDrinks';

export default function CategoryBtnDrinks({ index, categoryName }) {
  const [verify, setVerify] = useState(true);
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (verify) {
      const data = await getDrink(`${ENDPOINT_BY_CATEGORY}${categoryName}`);
      dispatch(setFoodAndDrinks(data));
      setVerify(false);
    } else {
      const response = await getDrink(SEARCH_ENDPOINT);
      dispatch(setFoodAndDrinks(response));
    }
  };

  return (
    <>
      {index === 0 && (
        <CategoryAllDrinks />
      )}
      <button
        className="btnCategory"
        type="button"
        data-testid={ `${categoryName}-category-filter` }
        onClick={ handleClick }
        style={ { flex: `${index === 0 ? '1.8' : 1}` } }
      >
        { categoryName }
      </button>
    </>
  );
}

CategoryBtnDrinks.propTypes = {
  categoryName: PropTypes.string,
}.isRequired;
