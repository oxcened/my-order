import * as React from 'react';
import './src/styles/global.css';
import Navbar from "./src/components/Navbar";

export const wrapRootElement = ({ element }, options) => {
  return <>
    <Navbar />
    {element}
  </>
};
