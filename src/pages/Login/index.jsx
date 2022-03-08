import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionLogin } from '../../redux/actions';

export default function Index() {
  const history = useHistory();
  const TOKEN = 1;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
    <div>
      <h1>Login</h1>
      <form onSubmit={ (e) => e.preventDefault() }>

        <label htmlFor="emailInput">
          <input
            type="email"
            name="emailInput"
            id="email-input"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="passwordInput">
          <input
            type="password"
            name="passwordInput"
            id="password-input"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <button
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
