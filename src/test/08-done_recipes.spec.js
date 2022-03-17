import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('testa a pagina de done recipes', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  const testIdName0 = '0-horizontal-name';
  const testIdFilterDrink = 'filter-by-drink-btn';

  beforeEach(() => {
    renderWithRedux(<DoneRecipes />, { initialState: { doneRecipes } });
  });

  it('Verifica se existem os TESTIDs dos botoes de filtro', () => {
    const filterBtnAll = screen.getByTestId('filter-by-all-btn');
    const filterBtnFood = screen.getByTestId('filter-by-food-btn');
    const filterBtnDrink = screen.getByTestId(testIdFilterDrink);

    expect(filterBtnAll).toBeInTheDocument();
    expect(filterBtnFood).toBeInTheDocument();
    expect(filterBtnDrink).toBeInTheDocument();
  });

  it('Verifica se existem os TESTIDs dos cards', () => {
    const textNationalityCategoryCard1 = screen.getByTestId('0-horizontal-top-text');
    const imgCard1 = screen.getByTestId('0-horizontal-image');
    const nameCard1 = screen.getByTestId(testIdName0);
    const dateCard1 = screen.getByTestId('0-horizontal-done-date');
    const shareCard1 = screen.getByTestId('0-horizontal-share-btn');
    const tag1Card1 = screen.getByTestId('0-Pasta-horizontal-tag');
    const tag2Card1 = screen.getByTestId('0-Curry-horizontal-tag');

    const textNationalityCategoryCard2 = screen.getByTestId('1-horizontal-top-text');
    const imgCard2 = screen.getByTestId('1-horizontal-image');
    const nameCard2 = screen.getByTestId('1-horizontal-name');
    const dateCard2 = screen.getByTestId('1-horizontal-done-date');
    const shareCard2 = screen.getByTestId('1-horizontal-share-btn');

    expect(textNationalityCategoryCard1).toBeInTheDocument();
    expect(imgCard1).toBeInTheDocument();
    expect(nameCard1).toBeInTheDocument();
    expect(dateCard1).toBeInTheDocument();
    expect(shareCard1).toBeInTheDocument();
    expect(tag1Card1).toBeInTheDocument();
    expect(tag2Card1).toBeInTheDocument();

    expect(textNationalityCategoryCard2).toBeInTheDocument();
    expect(imgCard2).toBeInTheDocument();
    expect(nameCard2).toBeInTheDocument();
    expect(dateCard2).toBeInTheDocument();
    expect(shareCard2).toBeInTheDocument();
  });

  it('Verifica se o botao de filtro food deixa apenas os cards de food', () => {
    const filterBtnFood = screen.getByTestId('filter-by-food-btn');
    userEvent.click(filterBtnFood);
    const nameCard1 = screen.getByTestId(testIdName0);

    expect(nameCard1).toHaveTextContent('Spicy Arrabiata Penne');
  });

  it('Verifica se o botao de filtro drinks deixa apenas os cards de drinks', () => {
    const filterBtnDrink = screen.getByTestId(testIdFilterDrink);
    userEvent.click(filterBtnDrink);
    const nameCard1 = screen.getByTestId(testIdName0);

    expect(nameCard1).toHaveTextContent('Aquamarine');
  });

  it('Verifica se o botao de filtro all mostra todos os cards', () => {
    const filterBtnDrink = screen.getByTestId(testIdFilterDrink);
    const filterBtnAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(filterBtnDrink);
    userEvent.click(filterBtnAll);

    const nameCard1 = screen.getByTestId(testIdName0);
    const nameCard2 = screen.getByTestId('1-horizontal-name');

    expect(nameCard1).toHaveTextContent(doneRecipes[0].name);
    expect(nameCard2).toHaveTextContent(doneRecipes[1].name);
  });
});
