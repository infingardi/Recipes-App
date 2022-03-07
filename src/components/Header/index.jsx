import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';

import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title }) {
  const { push } = useHistory();
  const [isSearching, setIsSearching] = useState(false);

  return (
    <header>
      <button
        type="button"
        onClick={ () => push('/profile') }
        data-testid="profile-top-btn"
      >
        <img src={ profileIcon } alt="search" />
      </button>

      <h1 data-testid="page-title">
        { title }
      </h1>

      <button
        type="button"
        onClick={ () => setIsSearching(!isSearching) }
        data-testid="search-top-btn"
      >
        <img src={ searchIcon } alt="search" />
      </button>

      { isSearching && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  title: Proptypes.string.isRequired,
};

export default Header;
