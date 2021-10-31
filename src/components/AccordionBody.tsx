import classNames from 'classnames';
import * as React from 'react';
import { useRef } from 'react';
import '../styles/components/_accordion-body.scss';

const AccordionBody = ({ children, isOpen }: {
  children?: React.ReactNode;
  isOpen?: boolean;
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
    <div ref={ref} className='p-3 border-t'>
      {children}
    </div>
  </div>;
}

export default AccordionBody;
