import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import Button from './Button';

describe('Button.tsx', () => {
  test("Should render button", () => {
    render(<Button color='primary' />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test("Should call onClick once per click event", () => {
    const onClick = jest.fn();
    render(<Button color='primary' onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("Should not call onClick if disabled", () => {
    const onClick = jest.fn();
    render(<Button disabled color='primary' onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
