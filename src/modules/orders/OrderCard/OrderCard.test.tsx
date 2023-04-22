import { render, screen } from '@testing-library/react';
import * as React from 'react';
import TestComponent from '@/modules/orders/OrderCard/OrderCard';
import userEvent from '@testing-library/user-event';
import { Order } from '@/modules/orders/Order';
import { User } from '@/modules/auth/User';

const order = {
  id: '123',
  author: {
    avatar: 1,
    name: 'Alen Ajam'
  },
  products: [{
    id: '123',
    title: 'Water',
    description: 'Wet'
  }]
} as Order;

jest.mock('@/modules/auth/useAuth', () => ({
  useAuth: () => ({
    user: order.author as User
  })
}));

jest.mock('@/common/images/avatars/avatars', () => ({
  getAvatar: () => ''
}));

describe('OrderCard.tsx', () => {
  test("Should render order component", () => {
    render(<TestComponent order={order} index={1} />);
    expect(screen.getByTestId('order')).toBeInTheDocument();
  });

  test("Should render the author's name", async () => {
    render(<TestComponent order={order} index={1} />);
    expect(screen.getByTestId('author-name')).toHaveTextContent(order.author.name);
  });

  test("Should call onDelete once per delete button click", async () => {
    const onDelete = jest.fn();
    render(<TestComponent order={order} index={1} onDelete={onDelete} />);
    await userEvent.click(screen.getByTestId('delete-button'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  test("Should call onEdit once per edit button click", async () => {
    const onEdit = jest.fn();
    render(<TestComponent order={order} index={1} onEdit={onEdit} />);
    await userEvent.click(screen.getByTestId('edit-button'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
