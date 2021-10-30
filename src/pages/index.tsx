import * as React from "react"
import { ClipboardListIcon, PlusIcon } from '@heroicons/react/solid';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Orders from '../components/Orders';
import ordersApi from '../redux/apis/orders';
import PrimaryButton from '../components/PrimaryButton';

const IndexPage = () => {
  const { data = [] } = ordersApi.useGetTodayOrdersQuery();

  return (
    <main>
      <Navbar />

      <div className='px-4 pt-5 sm:pt-8 sm:px-8'>
        <p className='text-black text-3xl sm:text-5xl'>Welcome to WinkEat</p>
        <p className='text-gray-500 text-2xl sm:text-3xl mt-1 sm:mt-2'>Today's orders</p>

        <div className='flex mt-3 sm:mt-5'>
          <PrimaryButton className='flex items-center mr-3'>
            <ClipboardListIcon className='h-5 mr-1 cursor-pointer' />
            Summary
          </PrimaryButton>

          <PrimaryButton className='items-center hidden sm:flex'>
            <PlusIcon className='h-5 mr-1 cursor-pointer' />
            Insert Order
          </PrimaryButton>
        </div>

        <Orders orders={data} />
      </div>

      <Button
        className='rounded-full text-white bg-primary flex items-center fixed bottom-0 right-0 m-5 shadow-lg sm:hidden'>
        <PlusIcon className='h-5 mr-1 cursor-pointer' />
        Make Order
      </Button>
    </main>
  )
}

export default IndexPage
