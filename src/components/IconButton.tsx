import * as React from 'react';
import classNames from 'classnames';

const IconButton = (props: {
  color: 'primary' | 'white'
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return <button {...props} className={classNames(
    'rounded-full grid place-content-center transition ease-in-out transform duration-300',
    props.className,
    {
      'hover:bg-gray-200 ': props.color === 'white',
      'text-primary bg-primary bg-opacity-10 hover:bg-opacity-20': props.color === 'primary'
    }
  )} />;
};

export default IconButton;
