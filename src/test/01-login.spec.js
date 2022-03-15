import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRedux from './renderWithRouter';

describe('testa a pagina de login', () => {
  test('can render with redux with defaults', () => {
    const { history } = renderWithRedux(<App />);
    expect(history.location.pathname).toBe('/');
    // const firstField = getByTestId('input1');
    // expect(firstField).toBeInTheDocument();
  });

  it('Verifica se existe os inputs para fazer login ', () => {
    renderWithRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('testa funcionalidade do botao de login', () => {
    renderWithRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByTestId('login-submit-btn');

    expect(btn).toBeDisabled();

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '1234567');
    // expect(email.value).toBe('email@email.com');
    expect(btn).not.toBeDisabled();

    userEvent.click(btn);
    expect(window.location.pathname).toBe('/foods');
  });
});
