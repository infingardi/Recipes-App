import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setFoodAndDrinks } from '../../redux/actions';

import { fetchFoodsOrDrinks } from '../../services';

function SearchBar() {
  const history = useHistory();
  const option = useRef();
  const inputText = useRef();
  const dispatch = useDispatch();

  const verifyFirstLetter = () => {
    const verify = option.current.includes('f=') && inputText.current.length > 1;

    return verify;
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    const arrayPathname = history.location.pathname.split('/')[1];
    const reqPath = `${option.current}${inputText.current}`;

    if (verifyFirstLetter()) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    // let data;
    // if (arrayPathname === 'foods') {
    //   data = await getFood(reqPath);
    // } else if (arrayPathname === 'drinks') {
    //   data = await getDrink(reqPath);
    // }

    fetchFoodsOrDrinks[arrayPathname](reqPath).then((response) => {
      const verifyResponseOne = Object.values(response).flat();
      if (verifyResponseOne.length === 1) {
        if (verifyResponseOne[0] !== null) {
          history.push(`/${arrayPathname}/${verifyResponseOne[0][arrayPathname === 'foods'
            ? 'idMeal' : 'idDrink']}`);
        } else {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
      } else {
        dispatch(setFoodAndDrinks(response));
      }
    });
  };

  return (
    <form
      style={ {
        display: 'flex',
        flexDirection: 'column',
      } }
    >
      <label htmlFor="search-input">
        <input
          style={ { width: '100%', textAlign: 'center' } }
          data-testid="search-input"
          id="search-input"
          placeholder="Search Recipe"
          onChange={ ({ target }) => { inputText.current = target.value; } }
        />
      </label>

      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-around',
        } }
      >
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="search-radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            onClick={ () => { option.current = 'filter.php?i='; } }
          />
          Ingredient
        </label>

        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="search-radio"
            data-testid="name-search-radio"
            id="name-search-radio"
            onClick={ () => { option.current = 'search.php?s='; } }
          />
          Name
        </label>

        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="search-radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            onClick={ () => { option.current = 'search.php?f='; } }
          />
          First Letter
        </label>
      </div>
      <button
        style={ { background: '#fe4d68d4' } }
        data-testid="exec-search-btn"
        type="submit"
        onClick={ (event) => { handleSubmitButton(event); } }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
