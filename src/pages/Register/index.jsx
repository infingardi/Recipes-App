import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';

import supabase from '../../supabase';
// import { actionLogin } from '../../redux/actions';
import logo from '../../images/HowHungry.png';
import background from '../../images/download.png';
import './index.css';

function Register() {
  // const TOKEN = 1;
  const history = useHistory();
  // const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isViewPassword, setIsViewPassword] = useState(false);

  const MIN_LENGTH = 7;
  const REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{3}$/;

  const verifyInputs = () => {
    const emailTest = !(REGEX.test(email));
    const passwordtest = password.length < MIN_LENGTH;
    const confirmPasswordtest = password !== confirmPassword;

    const verify = !emailTest && !passwordtest && !confirmPasswordtest;

    return !verify;
  };

  async function registerUser(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      global.alert('Usuario já existente');
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
        alt="logo"
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

        <label htmlFor="confirmPasswordInput" className="label-form">
          <input
            placeholder="Confirm Password"
            type={ isViewPassword ? 'text' : 'password' }
            name="confirmPasswordInput"
            id="confirm-password-input"
            data-testid="confirm-password-input"
            value={ confirmPassword }
            onChange={ ({ target }) => setConfirmPassword(target.value) }
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
          disabled={ verifyInputs() }
          onClick={ (e) => registerUser(e) }
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
