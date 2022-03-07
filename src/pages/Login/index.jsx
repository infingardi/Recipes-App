import React from 'react';

export default function index() {
  // const emailContext = useContext;
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
            // value={ email }
            // onChange={ emailContext }
          />
        </label>

        <label htmlFor="passwordInput">
          <input
            type="password"
            name="passwordInput"
            id="password-input"
            data-testid="password-input"
            // value={ password }
            // onChange={ console.log('passwordlChange') }
          />
        </label>

        <button
          type="submit"
          name="submitBTN"
          id="loggin-submit-btn"
          data-testid="login-submit-btn"
          // disabled={ true }
          // onClick={ console.log('click') }
        >
          Enter
        </button>

      </form>
    </div>
  );
}
