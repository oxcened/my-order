import { render, screen } from '@testing-library/react';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { PrintSummaryModal as TestComponent } from './PrintSummaryModal';

describe('PrintOrderSummaryModal.tsx', () => {
  test("Should render modal", () => {
    render(<TestComponent isOpen={true} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test("Should disable submit button if form is invalid", async () => {
    render(<TestComponent isOpen={true} />);
    expect(screen.getByTestId('submit-btn')).toBeDisabled();
  });

  test("Should enable submit button if form is valid", async () => {
    render(<TestComponent isOpen={true} />);
    await userEvent.type(screen.getByTestId('price-input'), '100');
    await userEvent.type(screen.getByTestId('orders-input'), '10');
    expect(screen.getByTestId('submit-btn')).not.toBeDisabled();
  });

  test("Should call onConfirm once per submit button click", async () => {
    const onConfirm = jest.fn();
    render(<TestComponent isOpen={true} onConfirm={onConfirm} />);

    await userEvent.type(screen.getByTestId('price-input'), '100');
    await userEvent.type(screen.getByTestId('orders-input'), '10');
    await userEvent.click(screen.getByTestId('submit-btn'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test("Should call onCancel once per cancel button click", async () => {
    const onCancel = jest.fn();
    render(<TestComponent isOpen={true} onCancel={onCancel} />);

    await userEvent.click(screen.getByTestId('cancel-btn'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("Should not call onCancel on submit button click", async () => {
    const onCancel = jest.fn();
    render(<TestComponent isOpen={true} onCancel={onCancel} />);

    await userEvent.type(screen.getByTestId('price-input'), '100');
    await userEvent.type(screen.getByTestId('orders-input'), '10');
    await userEvent.click(screen.getByTestId('submit-btn'));
    expect(onCancel).not.toHaveBeenCalled();
  });

  test("Should not call onConfirm on cancel button click", async () => {
    const onConfirm = jest.fn();
    render(<TestComponent isOpen={true} onConfirm={onConfirm} />);

    await userEvent.type(screen.getByTestId('price-input'), '100');
    await userEvent.type(screen.getByTestId('orders-input'), '10');
    await userEvent.click(screen.getByTestId('cancel-btn'));
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
