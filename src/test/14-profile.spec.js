import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from './renderWithRouter';
import Profile from '../pages/Profile';

describe('testa a pagina de profile', () => {
  const EMAIL_TESTID = 'profile-email';
  const DONE_TESTID = 'profile-done-btn';
  const FAVORITE_TESTID = 'profile-favorite-btn';
  const LOGOUT_TESTID = 'profile-logout-btn';
  beforeEach(() => {
    renderWithRedux(<Profile />);
    // window.localStorage.setItem('user', '{ "email": "email@email.coma" }');
  });

  test('Verifica se existem todos os TESTIDs ', () => {
    const email = screen.getByTestId(EMAIL_TESTID);
    const doneRecipesBtn = screen.getByTestId(DONE_TESTID);
    const favoritesBtn = screen.getByTestId(FAVORITE_TESTID);
    const logoutBtn = screen.getByTestId(LOGOUT_TESTID);
    expect(email).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoritesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('testa se email está visível', () => {
    const email = screen.getByTestId(EMAIL_TESTID);
    expect(email).toHaveTextContent('email@email.com');
  });

  it('testa se os botoes estão visíveis', () => {
    const doneRecipesBtn = screen.getByTestId(DONE_TESTID);
    const favoritesBtn = screen.getByTestId(FAVORITE_TESTID);
    const logoutBtn = screen.getByTestId(LOGOUT_TESTID);
    expect(doneRecipesBtn).toHaveTextContent('Done Recipes');
    expect(favoritesBtn).toHaveTextContent('Favorite Recipes');
    expect(logoutBtn).toHaveTextContent('Logout');
  });

  it('testa funcionalidade do botao de done recipes', () => {
    const doneRecipesBtn = screen.getByTestId(DONE_TESTID);

    userEvent.click(doneRecipesBtn);
    expect(window.location.pathname).toBe('/done-recipes');
  });

  it('testa funcionalidade do botao de favorite recipes', () => {
    const favoriteRecipesBtn = screen.getByTestId(FAVORITE_TESTID);

    userEvent.click(favoriteRecipesBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  it('testa funcionalidade do botao de logout', () => {
    const logoutBtn = screen.getByTestId(LOGOUT_TESTID);

    userEvent.click(logoutBtn);
    expect(window.location.pathname).toBe('/');
  });
});
