import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from './renderWithRouter';
import Profile from '../pages/Profile';

describe('testa a pagina de profile', () => {
  const EMAIL_DATATEST = 'profile-email';
  const DONE_DATATEST = 'profile-done-btn';
  const FAVORITE_DATATEST = 'profile-favorite-btn';
  const LOGOUT_DATATEST = 'profile-logout-btn';
  beforeEach(() => {
    renderWithRedux(<Profile />);
    // window.localStorage.setItem('user', '{ "email": "email@email.coma" }');
  });

  test('Verifica se existem todos os datatests ', () => {
    const email = screen.getByTestId(EMAIL_DATATEST);
    const doneRecipesBtn = screen.getByTestId(DONE_DATATEST);
    const favoritesBtn = screen.getByTestId(FAVORITE_DATATEST);
    const logoutBtn = screen.getByTestId(LOGOUT_DATATEST);
    expect(email).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoritesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('testa se email está visível', () => {
    const email = screen.getByTestId(EMAIL_DATATEST);
    expect(email).toHaveTextContent('email@email.com');
  });

  it('testa se os botoes visível', () => {
    const doneRecipesBtn = screen.getByTestId(DONE_DATATEST);
    const favoritesBtn = screen.getByTestId(FAVORITE_DATATEST);
    const logoutBtn = screen.getByTestId(LOGOUT_DATATEST);
    expect(doneRecipesBtn).toHaveTextContent('Done Recipes');
    expect(favoritesBtn).toHaveTextContent('Favorite Recipes');
    expect(logoutBtn).toHaveTextContent('Logout');
  });

  it('testa funcionalidade do botao de done recipes', () => {
    const doneRecipesBtn = screen.getByTestId(DONE_DATATEST);

    userEvent.click(doneRecipesBtn);
    expect(window.location.pathname).toBe('/done-recipes');
  });

  it('testa funcionalidade do botao de favorite recipes', () => {
    const favoriteRecipesBtn = screen.getByTestId(FAVORITE_DATATEST);

    userEvent.click(favoriteRecipesBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  it('testa funcionalidade do botao de logout', () => {
    const logoutBtn = screen.getByTestId(LOGOUT_DATATEST);

    userEvent.click(logoutBtn);
    expect(window.location.pathname).toBe('/');
  });
});
