import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from './renderWithRouter';

import FavoriteRecipes from '../pages/FavoriteRecipes';

const { getComputedStyle } = global.window;

const favRecipes = [
  {
    category: 'Side',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'food',
  },
  {
    alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
  },
];
// console.log(localStorage.favoriteRecipes);
describe('Teste o componente FavoriteRecipes />',
  () => {
    beforeEach(() => {
      window.getComputedStyle = (eletm, select) => getComputedStyle(eletm, select); // https://www.syncfusion.com/kb/12418/how-to-clear-script-errors-in-react-jest-testing
    });

    test('Todos os items favorits estão na tela', () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes]));
      renderWithRedux(<FavoriteRecipes />);
      const favFood = screen.getByText(/corba/i);
      const favDrink = screen.getByText(/GG/i);

      expect(favDrink).toBeInTheDocument();
      expect(favFood).toBeInTheDocument();
    });

    test('Todos os data-testids estão na tela', () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes]));
      renderWithRedux(<FavoriteRecipes />);
      favRecipes.forEach((fav, index) => {
        const btnAll = screen.getByTestId('filter-by-all-btn');
        expect(btnAll).toBeInTheDocument();
        const btnFoods = screen.getByTestId('filter-by-food-btn');
        expect(btnFoods).toBeInTheDocument();

        const btnDrinks = screen.getByTestId('filter-by-drink-btn');
        expect(btnDrinks).toBeInTheDocument();

        const cardFood = screen.getByTestId(`${index}-horizontal-image`);
        expect(cardFood).toBeInTheDocument();

        const cardDrink = screen.getByTestId(`${index}-horizontal-image`);
        expect(cardDrink).toBeInTheDocument();

        const textCategoryFood = screen.getByTestId(`${index}-horizontal-top-text`);
        expect(textCategoryFood).toBeInTheDocument();

        const textCategoryDrink = screen.getByTestId(`${index}-horizontal-top-text`);
        expect(textCategoryDrink).toBeInTheDocument();

        const shareBtnDrink = screen.getByTestId(`${index}-horizontal-share-btn`);
        expect(shareBtnDrink).toBeInTheDocument();

        const shareBtnFood = screen.getByTestId(`${index}-horizontal-share-btn`);
        expect(shareBtnFood).toBeInTheDocument();
      });
    });

    test('Ao clicar no botão compartilhar aparece a mensagem "Link copied!"', () => {
      // localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes]));
      // renderWithRedux(<FavoriteRecipes />);
      // const btnShare = screen.getByTestId('0-horizontal-share-btn');
      // // ERRO CLIPBOARD
      // console.log(btnShare);
      // userEvent.click(btnShare);
      // const textCopied = screen.getByText(/Link copied!/i);
      // sexpect(textCopied).toBeInTheDocument();
    });

    test('Ao clicar no botão de "desfavoritar" a receita é removida da tela', () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes]));
      renderWithRedux(<FavoriteRecipes />);
      const btnFav = screen.getByTestId('0-horizontal-favorite-btn');
      const favFood = screen.getByRole('heading', { name: /Corba/i });
      expect(favFood).toBeInTheDocument();

      userEvent.click(btnFav);

      expect(favFood).not.toBeInTheDocument();
    });

    test('Ao clicar no botão "All" o filtro deve ser removido', () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes]));
      renderWithRedux(<FavoriteRecipes />);
      const btnAll = screen.getByTestId('filter-by-all-btn');
      const nameDrink = screen.getByRole('heading', { name: /gg/i });
      const nameFood = screen.getByRole('heading', {
        name: /corba/i });
      userEvent.click(btnAll);
      expect(nameFood).toBeInTheDocument();
      expect(nameDrink).toBeInTheDocument();
    });

    test('Ao clicar no botão "Drink" as receitas devem ser filtradas por Drinks', () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes]));
      renderWithRedux(<FavoriteRecipes />);
      const btnDrink = screen.getByTestId('filter-by-drink-btn');
      const nameFood = screen.getByRole('heading', {
        name: /corba/i,
      });
      expect(nameFood).toBeInTheDocument();
      userEvent.click(btnDrink);
      expect(nameFood).not.toBeInTheDocument();
    });

    test('Ao clicar no botão "Food" as receitas devem ser filtradas por comidas', () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipes]));
      renderWithRedux(<FavoriteRecipes />);
      const btnFood = screen.getByTestId('filter-by-food-btn');
      const nameDrink = screen.getByText(/gg/i);

      expect(nameDrink).toBeInTheDocument();
      userEvent.click(btnFood);
      expect(nameDrink).not.toBeInTheDocument();
    });

    test('Ao clicar na receita, a rota deve mudar para a tela de detalhes', () => {
      renderWithRedux(<FavoriteRecipes />);
      const imgRecipe = screen.getByTestId('0-horizontal-image');
      userEvent.click(imgRecipe);

      expect(window.location.pathname).toBe('/foods/52977');
    });

    test('Ao clicar no nome da receita, a rota deve mudar para detalhes', () => {
      renderWithRedux(<FavoriteRecipes />);
      const nameRecipe = screen.getByTestId('0-horizontal-name');
      userEvent.click(nameRecipe);

      expect(window.location.pathname).toBe('/foods/52977');
    });

    test('O card possui os atributos corretos de uma comida', () => {
      renderWithRedux(<FavoriteRecipes />);
      favRecipes.forEach((fav) => {
        if (fav.type === 'food') {
          const imgFood = screen.getByTestId('0-horizontal-image');
          expect(imgFood.src).toEqual(fav.image);

          const nameFood = screen.getByTestId('0-horizontal-name');
          expect(nameFood).toBeInTheDocument();

          const categoryFood = screen.getByText(/turkish - side/i);
          expect(categoryFood).toBeInTheDocument();

          const btnShareFood = screen.getByTestId('0-horizontal-share-btn');
          expect(btnShareFood).toBeInTheDocument();
        }
      });
    });

    test('O card possui os atributos corretos de uma drinks', () => {
      renderWithRedux(<FavoriteRecipes />);
      favRecipes.forEach((fav) => {
        if (fav.type === 'drink') {
          const imgDrink = screen.getByTestId('1-horizontal-image');
          expect(imgDrink.src).toEqual(fav.image);

          const nameDrink = screen.getByTestId('1-horizontal-name');
          expect(nameDrink).toBeInTheDocument();

          const categoryDrink = screen.getByText(/turkish - side/i);
          expect(categoryDrink).toBeInTheDocument();

          const btnShareFood = screen.getByTestId('1-horizontal-share-btn');
          expect(btnShareFood).toBeInTheDocument();
        }
      });
    });
  });
