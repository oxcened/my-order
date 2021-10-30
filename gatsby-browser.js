import { Provider } from 'react-redux';
import store from './src/redux/store';
import * as React from 'react';

export const wrapRootElement = ({ element }, options) => {
  return <Provider store={store}>
    {element}
  </Provider>
};
