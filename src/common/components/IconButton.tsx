import * as React from 'react';
import classNames from 'classnames';

const IconButton = (props: {
  color: 'primary' | 'light'
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return <button {...props} className={classNames(
    'rounded-full grid place-content-center transition ease-in-out transform duration-300',
    props.className,
    !props.disabled
      ? {
        'hover:bg-gray-200 ': props.color === 'light',
        'text-primary-500 bg-primary-500 bg-opacity-10 hover:bg-opacity-20': props.color === 'primary'
      } : {
        'bg-gray-100 text-gray-400 cursor-not-allowed': props.disabled
      }
  )} />;
};

export default IconButton;
