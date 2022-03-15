import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from './renderWithRouter';
import Explore from '../pages/Explore';

describe('testa a pagina de explore', () => {
  const FOODS_DATATEST = 'explore-foods';
  const DRINKS_DATATEST = 'explore-drinks';
  beforeEach(() => {
    renderWithRedux(<Explore />);
  });

  test('Verifica se existem todos os datatests ', () => {
    const foodsButton = screen.getByTestId(FOODS_DATATEST);
    const drinksButton = screen.getByTestId(DRINKS_DATATEST);
    expect(foodsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
  });

  it('testa se os botoes estão visíveis', () => {
    const foodsButton = screen.getByTestId(FOODS_DATATEST);
    const drinksButton = screen.getByTestId(DRINKS_DATATEST);
    expect(foodsButton).toHaveTextContent('Explore Foods');
    expect(drinksButton).toHaveTextContent('Explore Drinks');
  });

  it('testa funcionalidade do botao explore foods', () => {
    const foodsButton = screen.getByTestId(FOODS_DATATEST);

    userEvent.click(foodsButton);
    expect(window.location.pathname).toBe('/explore/foods');
  });

  it('testa funcionalidade do botao explore drinks', () => {
    const drinksButton = screen.getByTestId(DRINKS_DATATEST);

    userEvent.click(drinksButton);
    expect(window.location.pathname).toBe('/explore/drinks');
  });
});
