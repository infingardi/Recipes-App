import React, { useState } from 'react';
import propTypes from 'prop-types';
import loginContext from './loginContext';

function LoginProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const data = {
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <loginContext.Provider value={ data }>
      { children }
    </loginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: propTypes.arrayOf(propTypes.element),
}.isRequired;

export default LoginProvider;
