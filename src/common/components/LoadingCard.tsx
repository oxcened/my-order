import * as React from 'react';
import classNames from 'classnames';

const LoadingCard = (props: { className?: string }) => {
  return <div
    className={classNames('bg-white border p-3 rounded-md animate-pulse max-w-md', props.className)}
  >
    <div className='w-full bg-primary-500 rounded-md bg-opacity-60 h-5' />
    <div className='space-y-3 mt-3'>
      {new Array(3)
        .fill(undefined)
        .map((value, index) => (
          <div key={index} className='bg-primary-500 h-5 w-32 rounded-md bg-opacity-60' />
        ))}
    </div>
  </div>;
}

export default LoadingCard;
