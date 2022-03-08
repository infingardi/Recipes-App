import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodsDetails from './pages/FoodsDetails';
import DrinksDetails from './pages/DrinkDetails';

import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsByIngredient from './pages/ExploreFoodsByIngredient';
import ExploreDrinksByIngredient from './pages/ExploreDrinksByIngredient';
import ExploreFoodsByNationality from './pages/ExploreFoodsByNationality';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ FoodsDetails } />
      <Route exact path="/drinks/:id" component={ DrinksDetails } />

      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredient"
        component={ ExploreFoodsByIngredient }
      />
      <Route
        exact
        path="/explore/drinks/ingredient"
        component={ ExploreDrinksByIngredient }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsByNationality }
      />
    </Switch>
  );
}

export default App;
