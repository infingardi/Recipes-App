import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';

import supabase from '../../supabase';
import { useLogin } from '../../hooks';
import logo from '../../images/HowHungry.png';
import background from '../../images/download.png';
import './index.css';

export default function Index() {
  const MIN_LENGTH = 7;
  const REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{3}$/;
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isViewPassword, setIsViewPassword] = useState(false);

  const { handleLogin } = useLogin();

  const teste = () => {
    const emailTest = !(REGEX.test(email));
    const passwordtest = password.length < MIN_LENGTH;
    if (emailTest === false && passwordtest === false) {
      return (
        false
      );
    }
    return (
      true
    );
  };

  async function loginUser() {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    handleLogin(email);

    if (error) {
      global.alert('Email ou senha incorretos');
      return;
    }

    history.push('/foods');
  }

  useEffect(() => {
    localStorage.clear();
  });

  return (
    <div className="login-container">
      <img
        className="img-background"
        src={ background }
        alt=""
      />
      <img src={ logo } alt="logo" width="150px" />
      <form onSubmit={ (e) => e.preventDefault() } className="form-login">

        <label htmlFor="emailInput" className="label-form">
          <input
            placeholder="Email"
            type="email"
            name="emailInput"
            id="email-input"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="passwordInput" className="label-form">
          <input
            placeholder="Password"
            type={ isViewPassword ? 'text' : 'password' }
            name="passwordInput"
            id="password-input"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <button type="button" onClick={ () => setIsViewPassword(!isViewPassword) }>
            {isViewPassword ? <IoMdEye /> : <IoMdEyeOff /> }
          </button>
        </label>

        <button
          className="btn-login"
          type="submit"
          name="submitBTN"
          id="loggin-submit-btn"
          data-testid="login-submit-btn"
          disabled={ teste() }
          onClick={ loginUser }
        >
          Enter
        </button>

        <button
          className="btn-login"
          type="button"
          name="registerBTN"
          id="register-submit-btn"
          data-testid="register-submit-btn"
          onClick={ () => history.push('/register') }
        >
          Register
        </button>
      </form>
    </div>
  );
}
