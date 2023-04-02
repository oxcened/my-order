import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { useState } from 'react';
import Accordion from './Accordion';
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Accordion isOpen={isOpen} onOpenChange={() => setOpen(open => !open)}>
      <AccordionHeader>
        Title
      </AccordionHeader>

      <AccordionBody>
        Body
      </AccordionBody>
    </Accordion>
  );
};

describe('Accordion.tsx', () => {
  test("Should render accordion", () => {
    render(<TestComponent />);
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });

  test("Should not render body by default", async () => {
    render(<TestComponent />);
    expect(screen.getByTestId('accordion-body')).not.toBeVisible();
  });

  test("Should render body if header is clicked", async () => {
    render(<TestComponent />);
    await userEvent.click(screen.getByTestId('accordion-header'));
    expect(screen.getByTestId('accordion-body')).toBeVisible();
  });
});
