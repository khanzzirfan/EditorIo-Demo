import { Transition } from '@headlessui/react';
import { Options as PopperOptions } from '@popperjs/core';
import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Portal } from 'react-portal';
import { useRecoilValue } from 'recoil';

import { appReadyState } from '../../state/atoms/app';
import { isTruthy } from '../../utils/boolean';
import classNames from '../../utils/classNames';

interface Props {
  targetElement: HTMLElement | null;
  children:
    | React.ReactNode
    | ((arrowProps: {
        style: React.CSSProperties;
        ref?: (instance: HTMLDivElement | null) => void;
      }) => React.ReactNode);
  isOpen: boolean;
  className?: string;
  transitionClass?: [string, string];
  transitionActiveClass?: [string, string];
  popperOptions?: Partial<PopperOptions>;
  hasArrow?: boolean;
}

function Popper({
  children,
  isOpen,
  className,
  targetElement,
  popperOptions,
  hasArrow,
  transitionActiveClass = ['scale-95', 'scale-100'],
  transitionClass = ['duration-100', 'duration-75'],
}: Props) {
  const appReady = useRecoilValue(appReadyState);
  const popperElRef = useRef<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(targetElement, popperElement, {
    ...popperOptions,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      ...(popperOptions?.modifiers ?? []),
      hasArrow && {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
    ].filter(isTruthy),
  });

  if (!appReady.rendered) {
    return null;
  }

  return (
    <Portal>
      <div
        className={className}
        ref={popperElRef}
        style={styles.popper}
        {...attributes.popper}
      >
        <Transition
          show={isOpen}
          unmount={false}
          enter={classNames('transition ease-out', transitionClass[0])}
          enterFrom={classNames(
            'transform opacity-0',
            transitionActiveClass[0],
          )}
          enterTo={classNames(
            'transform opacity-100',
            transitionActiveClass[1],
          )}
          leave={classNames('transition ease-in', transitionClass[1])}
          leaveFrom={classNames(
            'transform opacity-100',
            transitionActiveClass[1],
          )}
          leaveTo={classNames('transform opacity-0', transitionActiveClass[0])}
          beforeEnter={() => {
            setPopperElement(popperElRef.current);
          }}
          afterLeave={() => setPopperElement(null)}
        >
          {typeof children === 'function'
            ? children({ style: styles.arrow || {}, ref: setArrowElement })
            : children}
        </Transition>
      </div>
    </Portal>
  );
}

export default Popper;
