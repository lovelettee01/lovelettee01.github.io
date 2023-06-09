import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Main from './Main';
import 'helpers/initFA';

import store from 'store';
import { Provider } from 'react-redux';

const container = document.getElementById('main');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main>
        <App />
      </Main>
    </Provider>
  </React.StrictMode>
);
