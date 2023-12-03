import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { OrderCard as TestComponent } from './OrderCard';
import userEvent from '@testing-library/user-event';
import { Order } from '../models';
import { User } from '@/modules/auth';
import { Timestamp } from '@firebase/firestore';

const mockOrder: Order = {
  id: '123',
  author: {
    avatar: 1,
    name: 'Alen Ajam'
  },
  products: [{
    id: '123',
    title: 'Water',
    description: 'Wet'
  }],
  created: Timestamp.now()
};

jest.mock('@/modules/auth', () => ({
  useAuth: () => ({
    user: mockOrder.author satisfies User
  })
}));

jest.mock('@/common/images/avatars/avatars', () => ({
  getAvatar: () => ''
}));

describe('OrderCard.tsx', () => {
  test("Should render order component", () => {
    render(<TestComponent order={mockOrder} index={1} />);
    expect(screen.getByTestId('order')).toBeInTheDocument();
  });

  test("Should render the author's name", async () => {
    render(<TestComponent order={mockOrder} index={1} />);
    expect(screen.getByTestId('author-name')).toHaveTextContent(mockOrder.author.name);
  });

  test("Should call onDelete once per delete button click", async () => {
    const onDelete = jest.fn();
    render(<TestComponent order={mockOrder} index={1} onDelete={onDelete} />);
    await userEvent.click(screen.getByTestId('delete-button'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  test("Should call onEdit once per edit button click", async () => {
    const onEdit = jest.fn();
    render(<TestComponent order={mockOrder} index={1} onEdit={onEdit} />);
    await userEvent.click(screen.getByTestId('edit-button'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
