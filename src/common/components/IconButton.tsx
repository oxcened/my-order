import * as React from 'react';
import classNames from 'classnames';

const IconButton = (props: {
  color: 'primary' | 'light' | 'danger';
  outline?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return <button {...props} className={classNames(
    'rounded-full grid place-content-center transition ease-in-out transform duration-300',
    props.className,
    !props.disabled
      ? {
        'hover:bg-gray-200 ': props.color === 'light',
        'border': props.color === 'light' && props.outline,
        'hover:bg-red-100': props.color === 'danger',
        'text-primary-500 bg-primary-500/10 hover:bg-opacity-20': props.color === 'primary'
      } : {
        'bg-gray-100 text-gray-300 cursor-not-allowed': props.disabled
      }
  )} />;
};

export default IconButton;
