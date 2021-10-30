import * as React from 'react';
import classNames from 'classnames';
import Button from './Button';

const PrimaryButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return <Button {...props} className={classNames(
    'bg-primary bg-opacity-10 font-bold text-primary hover:bg-opacity-20',
    props.className
  )} />;
};

export default PrimaryButton;
