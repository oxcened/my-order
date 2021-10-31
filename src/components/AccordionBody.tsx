import classNames from 'classnames';
import * as React from 'react';
import { useRef } from 'react';
import '../styles/components/_accordion-body.scss';

const AccordionBody = ({ children, isOpen, className }: {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>();

  return <div
    className={classNames('accordion-body overflow-hidden')}
    style={{
      height: isOpen
        ? ref.current.offsetHeight
        : 0
    }}
  >
    <div ref={ref} className={classNames('p-3 border-t', className)}>
      {children}
    </div>
  </div>;
}

export default AccordionBody;
