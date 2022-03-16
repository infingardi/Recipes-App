import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';

import { actionLogin } from '../../redux/actions';
import logo from '../../images/HowHungry.png';
import background from '../../images/download.png';
import './index.css';

export default function Index() {
  const history = useHistory();
  const TOKEN = 1;
  const [email, setEmail] = useState('');
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  console.log(history);

  const MIN_LENGTH = 7;
  const REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{3}$/;
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

  function loginUser() {
    dispatch(actionLogin(email));
    localStorage.setItem('mealsToken', TOKEN);
    localStorage.setItem('cocktailsToken', TOKEN);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  }

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
      </form>
    </div>
  );
}
