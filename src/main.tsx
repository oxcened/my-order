import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Orders from './modules/orders/Orders';
import './main.css';
import { Provider } from 'react-redux';
import getStore from '@/common/utils/store';
import Layout from '@/common/components/Layout';
import OrderDetail from '@/modules/orderDetail/OrderDetail';
import Summary from '@/summary/summary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{
      path: '/',
      element: <Orders />
    }, {
      path: '/order/new',
      element: <OrderDetail />,
      loader: ({ params }) => {
        return { isEdit: false, id: undefined };
      }
    }, {
      path: '/order/:id',
      element: <OrderDetail />,
      loader: ({ params }) => {
        return { isEdit: true, id: params.id };
      }
    }, {
      path: '/summary',
      element: <Summary />,
      loader: ({ params }) => {
        return { isEdit: true, id: params.id };
      }
    }]
  }
]);

const Main = () => {
  const { store } = getStore();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Main />);
