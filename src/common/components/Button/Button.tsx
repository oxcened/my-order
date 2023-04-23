import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = {
  color: 'primary' | 'light' | 'danger' | 'dark';
  outline?: boolean;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const enabledClasses = [
    props.color === 'primary' && 'bg-primary-500 text-white hover:bg-primary-600 border border-primary-200',
    props.color === 'light' && 'bg-white hover:bg-gray-100',
    props.color === 'light' && props.outline && 'border',
    props.color === 'danger' && 'bg-white bg-opacity-10 text-red-500 hover:bg-gray-200',
    props.color === 'dark' && 'bg-black text-white hover:bg-gray-900 border'
  ];

  const classes = twMerge(
    'rounded-xl px-4 py-3 text-sm transition ease-in-out duration-300 font-bold flex items-center',
    props.disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100 border' : enabledClasses,
    props.className
  );

  return <button
    {...props}
    className={classes}
  />;
};

export default Button;
