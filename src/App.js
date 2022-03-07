import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
    </Switch>
  );
}

export default App;
