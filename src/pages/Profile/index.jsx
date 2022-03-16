import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Profile() {
  const [emailProfile, setEmailProfile] = useState('');

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'))
    || { email: 'email@email.com' };
    setEmailProfile(email);
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <section
        style={ {
          textAlign: 'center',
          marginTop: '10px',
          // height: 'calc(100vh - 90px)',
          // justifyContent: 'space-between',
        } }
      >
        <h1 data-testid="profile-email">{ emailProfile }</h1>
        <div
          style={ {
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
          } }
        >
          <Link to="/done-recipes" data-testid="profile-done-btn">Done Recipes</Link>

          <Link
            to="/favorite-recipes"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Link>
        </div>
        <Footer />
      </section>
    </div>
  );
}

export default Profile;
