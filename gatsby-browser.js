import { Provider } from 'react-redux';
import store from './src/redux/store';
import * as React from 'react';
import './src/styles/global.css';

export const wrapRootElement = ({ element }, options) => {
  return <Provider store={store}>
    <div className='font-nunito'>
      {element}
    </div>
  </Provider>
};
