import * as React from 'react';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/solid';
import '../styles/components/_checkbox.scss';

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const commonClasses = 'absolute top-0 bottom-0 left-0 right-0 w-full h-full';

  const inputClasses = classNames(
    'appearance-none bg-gray-200 rounded-md shadow-inner cursor-pointer',
    commonClasses,
    props.className
  );

  const iconClasses = classNames('text-primary-500 p-0.5 check-icon hidden pointer-events-none', commonClasses);

  return <div className='relative w-6 h-6'>
    <input
      {...props}
      className={inputClasses}
      type='checkbox'
    />

    <CheckIcon className={iconClasses} />
  </div>;
};

export default Checkbox;
