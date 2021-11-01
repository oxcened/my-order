import { Provider } from 'react-redux';
import store from './src/redux/store';
import * as React from 'react';
import './src/styles/global.css';
import Navbar from "./src/components/Navbar";

export const wrapRootElement = ({ element }, options) => {
  return <Provider store={store}>
    <Navbar />
    <div className='px-4 pt-6 sm:pt-8 sm:px-8'>
      {element}
    </div>
  </Provider>
};
