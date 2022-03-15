// App.test.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import reducer from '../redux/reducers';

function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {},
) {
  const history = createMemoryHistory();
  return {
    ...render(
      <BrowserRouter>
        <Provider store={ store }>
          {component}
        </Provider>
      </BrowserRouter>,
    ),
    store,
    history,
  };
}

export default renderWithRedux;
