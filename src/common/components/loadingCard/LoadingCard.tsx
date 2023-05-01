import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const LoadingCard = ({ index }: { index: number; }) => {
  return <div
    className={twMerge('flex justify-between pb-8 animate-pulse', !!index && 'pt-8')}
  >
    <div className='flex gap-5 flex-1'>
      <div className='bg-gray-100 h-12 w-12 rounded-full' />

      <div className='flex flex-col flex-1'>
        <div className='flex items-center gap-2'>
          <div className='h-5 w-12 bg-gray-100 rounded-xl' />
          <div className='h-5 w-12 bg-gray-100 rounded-xl' />
        </div>

        <div className='flex flex-col gap-3 mt-3'>
          {new Array(2)
            .fill(undefined)
            .map((value, index) => (
              <div key={index} className='flex justify-between'>
                <div className='flex flex-1 gap-5 items-center'>
                  <div className='w-10 h-10 p-1.5 bg-gray-100 rounded-xl relative grid place-content-center' />

                  <div className='flex flex-1 flex-col gap-2'>
                    <div className='h-5 w-full bg-gray-100 rounded-xl' />
                    <div className='h-5 w-full bg-gray-100 rounded-xl' />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>

  </div>;
};

export default LoadingCard;
