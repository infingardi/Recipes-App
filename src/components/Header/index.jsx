import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CgLogOut } from 'react-icons/cg';

import supabase from '../../supabase';
import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import RedirectButtonImg from '../RedirectButtonImg';
import './index.css';

function Header({ title, search }) {
  const [isSearching, setIsSearching] = useState(false);
  const history = useHistory();

  const handleClick = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert('Falha ao tentar deslogar');
      return;
    }

    localStorage.clear();
    history.push('/');
  };

  return (
    <header>
      <section className="header">
        <RedirectButtonImg
          dataTest="profile-top-btn"
          iconImg={ profileIcon }
          path="/profile"
          iconAlt="profile"
        />

        <h1 data-testid="page-title">
          { title }
        </h1>
        { search ? (
          <button
            type="button"
            onClick={ () => setIsSearching(!isSearching) }
            data-testid="search-top-btn"
            src={ searchIcon }
            style={ { background: 'none', border: 'none' } }
          >
            <img src={ searchIcon } alt="search" />
          </button>)
          : (
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ handleClick }
              style={ {
                all: 'unset',
                fontSize: '30px',
                display: 'flex',
              } }
            >
              <CgLogOut />
            </button>
          )}
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
