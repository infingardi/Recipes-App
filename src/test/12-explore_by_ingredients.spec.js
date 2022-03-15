import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from './renderWithRouter';
import ExploreFoodsByIngredient from '../pages/ExploreFoodsByIngredient';
import ExploreDrinksByIngredient from '../pages/ExploreDrinksByIngredient';

describe('testa a pagina de explore by ingredients', () => {
  const INGREDIENT_CARD_TESTID = '-ingredient-card';
  const CARD_IMG_TESTID = '-card-img';
  const CARD_NAME_TESTID = '-card-name';
  const MAX_LENGTH = 12;

  test('Verifica se existem todos os TESTIDs na explore foods by ingredients', () => {
    renderWithRedux(<ExploreFoodsByIngredient />);
    for (let index = 0; index < MAX_LENGTH; index += 1) {
      const ingredientCard = screen.getByTestId(`${index}${INGREDIENT_CARD_TESTID}`);
      const ingredientImage = screen.getByTestId(`${index}${CARD_IMG_TESTID}`);
      const ingredientName = screen.getByTestId(`${index}${CARD_NAME_TESTID}`);
      expect(ingredientCard).toBeInTheDocument();
      expect(ingredientImage).toBeInTheDocument();
      expect(ingredientName).toBeInTheDocument();
    }
  });

  it('Verifica se existem todos os TESTIDs na explore drinks by ingredients', () => {
    renderWithRedux(<ExploreDrinksByIngredient />);
    for (let index = 0; index < MAX_LENGTH; index += 1) {
      const ingredientCard = screen.getByTestId(`${index}${INGREDIENT_CARD_TESTID}`);
      const ingredientImage = screen.getByTestId(`${index}${CARD_IMG_TESTID}`);
      const ingredientName = screen.getByTestId(`${index}${CARD_NAME_TESTID}`);
      expect(ingredientCard).toBeInTheDocument();
      expect(ingredientImage).toBeInTheDocument();
      expect(ingredientName).toBeInTheDocument();
    }
  });
});
