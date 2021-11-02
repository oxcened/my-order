import * as React from 'react';
import classNames from 'classnames';

const Button = (props: { color: 'primary' | 'white' | 'danger' } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return <button
    {...props}
    className={classNames(
      'rounded-md px-4 py-3 text-sm transition ease-in-out duration-300 font-bold flex items-center',
      props.className,
      {
        ...!props.disabled
          ? {
            'bg-primary-100 text-primary-500 hover:bg-primary-200': props.color === 'primary',
            'bg-white hover:bg-gray-200': props.color === 'white',
            'bg-white bg-opacity-10 text-red-500 hover:bg-gray-200': props.color === 'danger',
          }
          : {
            'bg-gray-100 text-gray-400 cursor-not-allowed': props.disabled
          }
      }
    )}
  />;
};

export default Button;
