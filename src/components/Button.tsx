import * as React from 'react';
import classNames from 'classnames';

const Button = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return <button
    {...props}
    className={classNames('rounded-md px-4 py-3 text-sm transform transition ease-in-out duration-300', props.className)}
  />;
};

export default Button;
