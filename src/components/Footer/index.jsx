import React from 'react';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import RedirectButtonImg from '../RedirectButtonImg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      // inline para passar no req 20
      style={ { position: 'fixed', bottom: '0px' } }
    >
      <RedirectButtonImg
        dataTest="drinks-bottom-btn"
        iconImg={ drinkIcon }
        path="/drinks"
        iconAlt="drinks"
      />

      <RedirectButtonImg
        dataTest="explore-bottom-btn"
        iconImg={ exploreIcon }
        path="/explore"
        iconAlt="explore"
      />

      <RedirectButtonImg
        dataTest="food-bottom-btn"
        iconImg={ mealIcon }
        path="/foods"
        iconAlt="meal"
      />
    </footer>
  );
}

export default Footer;
