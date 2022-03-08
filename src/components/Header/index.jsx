import React, { useState } from 'react';
import Proptypes from 'prop-types';

import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import RedirectButtonImg from '../RedirectButtonImg';

function Header({ title, search = false }) {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <header>
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
        >
          <img src={ searchIcon } alt="search" />
        </button>)}

      { isSearching && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  title: Proptypes.string.isRequired,
  search: Proptypes.bool.isRequired,
};

export default Header;
