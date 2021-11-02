import * as React from 'react';
import ordersApi from '../redux/apis/orders.api';
import { Product } from '../models/Product';
import { groupByKeyQuantity } from '../core/utils';
import LoadingCard from '../components/LoadingCard';

const Summary = () => {
  const { data, isLoading } = ordersApi.useGetTodayOrdersQuery();

  const getProducts = () => {
    if (!data?.length) {
      return <p className='my-2'>Looks like there's nothing here</p>;
    }

    const products = data.reduce((res, curr) => {
      return [...res, ...curr.products];
    }, [] as Product[]);

    return groupByKeyQuantity(products, 'id').map(([product, quantity]) => {
      return <div
        key={product.id}
        className='flex items-center cursor-pointer'
      >
        <div className='bg-gray-100 rounded-full font-bold block text-sm h-6 w-6 grid place-content-center'>
          {quantity}
        </div>

        <span className='ml-3'>{product.title}</span>
      </div>;
    });
  };

  return <main>
    <p className='text-black text-3xl sm:text-5xl'>Today's orders</p>
    <p className='text-gray-500 text-2xl sm:text-3xl mt-1 sm:mt-2'>Summary</p>

    {isLoading
      ? <LoadingCard className='mt-3 sm:mt-5' />
      : <div className='mt-3 sm:mt-5 bg-white border rounded-md px-3 py-5 space-y-5 sm:max-w-md'>
        {getProducts()}
      </div>}
  </main>;
};

export default Summary;
