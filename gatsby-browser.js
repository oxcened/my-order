import { Provider } from 'react-redux';
import store from './src/redux/store';
import * as React from 'react';
import './src/styles/global.css';
import Navbar from "./src/components/Navbar";

export const wrapRootElement = ({ element }, options) => {
  return <Provider store={store}>
    <Navbar />
    {element}
  </Provider>
};
