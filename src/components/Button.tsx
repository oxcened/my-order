import * as React from 'react';
import classNames from 'classnames';

const Button = (props: { color: 'primary' | 'white' } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return <button
    {...props}
    className={classNames(
      'rounded-md px-4 py-3 text-sm transform transition ease-in-out duration-300 font-bold flex items-center',
      props.className,
      {
        'bg-primary bg-opacity-10 text-primary hover:bg-opacity-20': props.color === 'primary',
        'bg-white hover:bg-gray-200': props.color === 'white'
      }
    )}
  />;
};

export default Button;
