import classNames from 'classnames';
import * as React from 'react';
import { CSSProperties, useState } from 'react';
import '../styles/components/_accordion-body.scss';
import { Transition } from 'react-transition-group';

const ANIM_DURATION_MS = 350;
const TRANSITION = `height ${ANIM_DURATION_MS}ms ease`;

const AccordionBody = ({ children, isOpen, className }: {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}) => {
  const [style, setStyle] = useState<Readonly<CSSProperties>>({ display: 'none' });

  const onEnter = () =>
    setStyle({ height: '0px' })

  function onEntering(node: any) {
    setStyle({
      height: node.scrollHeight,
      overflow: 'auto',
      transition: TRANSITION
    });
  }

  const onExit = (node: any) =>
    setStyle({
      height: node.scrollHeight
    });

  const onExiting = (node: any) => {
    // Keep this: It triggers a reflow
    const unused = node.scrollHeight;
    setStyle({
      height: 0,
      overflow: 'auto',
      transition: TRANSITION
    });
  }

  const onExited = (node: any) =>
    setStyle({
      display: 'none'
    });

  return <Transition
    in={isOpen}
    timeout={ANIM_DURATION_MS}
    onEnter={onEnter}
    onEntering={onEntering}
    onEntered={() => setStyle({})}
    onExit={onExit}
    onExiting={onExiting}
    onExited={onExited}
  >
    {state => {
      return (
        <div
          className='accordion-body'
          style={style}>
          <div className={classNames('p-3 border-t', className)}>
            {children}
          </div>
        </div>
      );
    }}
  </Transition>;
}

export default AccordionBody;
