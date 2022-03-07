import React, { useContext } from 'react';
import loginContext from '../../context/loginContext';

export default function Index() {
  const { email, setEmail, password, setPassword } = useContext(loginContext);
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

  return (
    <div>
      <h1>Login</h1>
      <form>

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
        >
          Enter
        </button>

      </form>
    </div>
  );
}
