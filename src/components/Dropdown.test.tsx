import { render, screen } from '@testing-library/react';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import Dropdown from './Dropdown';
import Button from './Button';
import DropdownMenu, { TRANSITION_TIMEOUT } from './DropdownMenu';

describe('Dropdown.tsx', () => {
  test("Should render dropdown button", () => {
    render(
      <Dropdown id='dropdown'>
        <Button
          color='white'
          id='dropdown-toggle'
        >
          Open
        </Button>

        <DropdownMenu options={[]} />
      </Dropdown>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test("Should render menu if button is clicked", async () => {
    render(
      <Dropdown id='dropdown'>
        <Button
          color='white'
          id='dropdown-toggle'
        >
          Open
        </Button>

        <DropdownMenu options={[]} />
      </Dropdown>
    );

    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('dropdown-menu')).toBeVisible();
  });

  test("Should unrender menu on click outside", async () => {
    render(
      <Dropdown id='dropdown'>
        <Button
          color='white'
          id='dropdown-toggle'
        >
          Open
        </Button>

        <DropdownMenu options={[]} />
      </Dropdown>
    );

    // Open the dropdown
    await userEvent.click(screen.getByRole('button'));
    // Click outside
    await userEvent.click(document.body);
    // Wait for close transition
    await new Promise(r => setTimeout(r, TRANSITION_TIMEOUT));
    expect(screen.queryByTestId('dropdown-menu')).not.toBeInTheDocument();
  });
});
