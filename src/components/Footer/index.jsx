import React from 'react';
import { useHistory } from 'react-router-dom';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      // inline para passar no req 20
      style={ { position: 'fixed', bottom: '0px' } }
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinks" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="meal" />
      </button>
    </footer>
  );
}

export default Footer;
