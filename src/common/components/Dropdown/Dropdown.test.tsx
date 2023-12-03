import { render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';
import Button from '@/common/components/Button/Button';

const TestComponent = () => (
  <Dropdown id='dropdown'>
    <Button
      color='light'
      id='dropdown-toggle'
    >
      Open
    </Button>

    <DropdownMenu options={[]} />
  </Dropdown>
);

describe('Dropdown.tsx', () => {
  test("Should render dropdown button", () => {
    render(<TestComponent />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test("Should render menu if button is clicked", async () => {
    render(<TestComponent />);

    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('dropdown-menu')).toBeVisible();
  });

  test("Should unrender menu on click outside", async () => {
    render(<TestComponent />);

    // Open the dropdown
    await userEvent.click(screen.getByRole('button'));
    // Click outside
    await userEvent.click(document.body);
    await waitFor(() => {
      return expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument();
    });
  });
});
