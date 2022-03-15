import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from './renderWithRouter';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoods from '../pages/ExploreFoods';

describe('testa a pagina de explore foods ou drinks', () => {
  const INGREDIENTS_TESTID = 'explore-by-ingredient';
  const NATIONALITY_TESTID = 'explore-by-nationality';
  const SURPRISE_TESTID = 'explore-surprise';

  test('Verifica se existem todos os TESTIDs na explore foods ', () => {
    renderWithRedux(<ExploreFoods />);
    const byIngredientButton = screen.getByTestId(INGREDIENTS_TESTID);
    const byNationalityButton = screen.getByTestId(NATIONALITY_TESTID);
    const surpriseButton = screen.getByTestId(SURPRISE_TESTID);
    expect(byIngredientButton).toBeInTheDocument();
    expect(byNationalityButton).toBeInTheDocument();
    expect(surpriseButton).toBeInTheDocument();
  });

  it('Verifica se existem todos os TESTIDs na explore drinks ', () => {
    renderWithRedux(<ExploreDrinks />);
    const byIngredientButton = screen.getByTestId(INGREDIENTS_TESTID);
    const surpriseButton = screen.getByTestId(SURPRISE_TESTID);
    expect(byIngredientButton).toBeInTheDocument();
    expect(surpriseButton).toBeInTheDocument();
  });

  it('testa se os botoes estão visíveis na explore foods', () => {
    renderWithRedux(<ExploreFoods />);
    const byIngredientButton = screen.getByTestId(INGREDIENTS_TESTID);
    const byNationalityButton = screen.getByTestId(NATIONALITY_TESTID);
    const surpriseButton = screen.getByTestId(SURPRISE_TESTID);
    expect(byIngredientButton).toHaveTextContent('By Ingredient');
    expect(byNationalityButton).toHaveTextContent('By Nationality');
    expect(surpriseButton).toHaveTextContent('Surprise me!');
  });

  it('testa se os botoes estão visíveis na explore drinks', () => {
    renderWithRedux(<ExploreDrinks />);
    const byIngredientButton = screen.getByTestId(INGREDIENTS_TESTID);
    const surpriseButton = screen.getByTestId(SURPRISE_TESTID);
    expect(byIngredientButton).toHaveTextContent('By Ingredient');
    expect(surpriseButton).toHaveTextContent('Surprise me!');
  });

  it('testa funcionalidade do botao de by ingredient na explore foods', () => {
    renderWithRedux(<ExploreFoods />);
    const byIngredientButton = screen.getByTestId(INGREDIENTS_TESTID);

    userEvent.click(byIngredientButton);
    expect(window.location.pathname).toBe('/explore/foods/ingredients');
  });

  it('testa funcionalidade do botao de by ingredient na explore drinks', () => {
    renderWithRedux(<ExploreDrinks />);
    const byIngredientButton = screen.getByTestId(INGREDIENTS_TESTID);

    userEvent.click(byIngredientButton);
    expect(window.location.pathname).toBe('/explore/drinks/ingredients');
  });

  it('testa funcionalidade do botao de by nationality na explore foods', () => {
    renderWithRedux(<ExploreFoods />);
    const byNationalityButton = screen.getByTestId(NATIONALITY_TESTID);

    userEvent.click(byNationalityButton);
    expect(window.location.pathname).toBe('/explore/foods/nationalities');
  });

  it('testa funcionalidade do botao de surprise me na explore foods', () => {
    renderWithRedux(<ExploreFoods />);
    const surpriseButton = screen.getByTestId(SURPRISE_TESTID);

    userEvent.click(surpriseButton);
    expect(window.location.pathname).toBe('/foods/0');
  });

  it('testa funcionalidade do botao de surprise me na explore foods', () => {
    renderWithRedux(<ExploreDrinks />);
    const surpriseButton = screen.getByTestId(SURPRISE_TESTID);

    userEvent.click(surpriseButton);
    expect(window.location.pathname).toBe('/drinks/0');
  });
});
