import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { getFood, getDrink } from '../../services';

function SearchBar() {
  const history = useHistory();
  const option = useRef();
  const inputText = useRef();

  const verifyFirstLetter = () => {
    const verify = option.current.includes('f=') && inputText.current.length > 1;

    return verify;
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    const arrayPathname = history.location.pathname.split('/');
    const reqPath = `${option.current}${inputText.current}`;

    if (verifyFirstLetter()) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    let data;
    if (arrayPathname[1] === 'foods') {
      data = await getFood(reqPath);
    } else if (arrayPathname[1] === 'drinks') {
      data = await getDrink(reqPath);
    }

    console.log(data);
  };

  return (
    <form>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          id="search-input"
          placeholder="Search Recipe"
          onChange={ ({ target }) => { inputText.current = target.value; } }
        />
      </label>

      <div>
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

        <button
          data-testid="exec-search-btn"
          type="submit"
          onClick={ (event) => { handleSubmitButton(event); } }
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
