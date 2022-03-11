import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile() {
  const [emailProfile, setEmailProfile] = useState('');
  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'))
    || { email: 'email@email.com' };
    setEmailProfile(email);
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <h1 data-testid="profile-email">{ emailProfile }</h1>
      <Link to="/done-recipes" data-testid="profile-done-btn">Done Recipes</Link>

      <Link
        to="/favorite-recipes"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </Link>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
