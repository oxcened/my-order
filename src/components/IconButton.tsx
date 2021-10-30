import * as React from 'react';
import classNames from 'classnames';

const IconButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return <button {...props} className={classNames(
    'hover:bg-gray-200 rounded-full grid place-content-center transition ease-in-out transform duration-300',
    props.className
  )} />;
};

export default IconButton;
