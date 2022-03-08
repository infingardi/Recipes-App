import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';

import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title, search = false }) {
  const { push } = useHistory();
  const [isSearching, setIsSearching] = useState(false);

  return (
    <header>
      <button
        type="button"
        onClick={ () => push('/profile') }
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="search" />
      </button>

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
