import React, { useState } from 'react';
import Proptypes from 'prop-types';

import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import RedirectButtonImg from '../RedirectButtonImg';

function Header({ title, search }) {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <header>
      <section
        style={ {
          alignItems: 'center',
          background: '#fe4d68',
          display: 'flex',
          justifyContent: 'space-around',
        } }
      >
        <RedirectButtonImg
          dataTest="profile-top-btn"
          iconImg={ profileIcon }
          path="/profile"
          iconAlt="profile"
        />

        <h1 data-testid="page-title">
          { title }
        </h1>
        { search && (
          <button
            type="button"
            onClick={ () => setIsSearching(!isSearching) }
            data-testid="search-top-btn"
            src={ searchIcon }
            style={ { background: 'none', border: 'none' } }
          >
            <img src={ searchIcon } alt="search" />
          </button>)}
      </section>
      { isSearching && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  title: Proptypes.string.isRequired,
  search: Proptypes.bool,
};

Header.defaultProps = {
  search: false,
};

export default Header;
