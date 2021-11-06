import * as React from 'react';
import { ChangeEventHandler, useState } from 'react';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/solid';
import '../styles/components/_checkbox.scss';

const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [checked, setChecked] = useState(props.checked);

  const commonClasses = 'absolute top-0 bottom-0 left-0 right-0 w-full h-full';

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(e.target.checked);
    props.onChange?.(e);
  };

  return <div className='relative w-6 h-6'>
    <input
      {...props}
      className={classNames(
        'appearance-none bg-gray-200 rounded-md shadow-inner cursor-pointer',
        commonClasses,
        props.className
      )}
      type='checkbox'
      onChange={onChange}
    />

    {checked
    && <CheckIcon className={classNames('text-primary-500 p-0.5 check-icon', commonClasses)} />}
  </div>;
};

export default Checkbox;
