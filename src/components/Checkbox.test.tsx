import { render, screen } from '@testing-library/react';
import * as React from 'react';
import Checkbox from './Checkbox';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

describe('Checkbox.tsx', () => {
  test("Should render checkbox", () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test("Should get checked on click event", async () => {
    render(<Checkbox />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test("Should not get checked on click event if disabled", async () => {
    render(<Checkbox disabled />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test("Should get checked on click event (controlled)", async () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);

      return (
        <Checkbox
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
      );
    };

    render(<TestComponent />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test("Should not get checked on click event if disabled (controlled)", async () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);

      return (
        <Checkbox
          disabled
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
      );
    };

    render(<TestComponent />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test("Should get checked if checked is set to true", async () => {
    const onChange = jest.fn();
    const { rerender } = render(<Checkbox checked={false} onChange={onChange} />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    rerender(<Checkbox checked={true} onChange={onChange} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test("Should get unchecked if checked is set to false", async () => {
    const onChange = jest.fn();
    const { rerender } = render(<Checkbox checked={true} onChange={onChange} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
    rerender(<Checkbox checked={false} onChange={onChange} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
