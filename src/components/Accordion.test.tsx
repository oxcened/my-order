import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { useState } from 'react';
import Accordion from './Accordion';
import AccordionHeader from './AccordionHeader';
import AccordionBody from './AccordionBody';
import userEvent from '@testing-library/user-event';

describe('Accordion.tsx', () => {
  test("Should render accordion", () => {
    render(<Accordion />);
    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });

  test("Should render body if header is clicked", async () => {
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

    render(<TestComponent />);
    expect(screen.getByTestId('accordion-body')).not.toBeVisible();
    await userEvent.click(screen.getByTestId('accordion-header'));
    expect(screen.getByTestId('accordion-body')).toBeVisible();
  });
});
