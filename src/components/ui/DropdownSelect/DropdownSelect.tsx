import { Listbox } from '@headlessui/react';
import { Options as PopperOptions } from '@popperjs/core';
import React from 'react';

import Popper from '../Popper';
import classNames from '../../../utils/classNames';

interface Props<Value> extends Partial<PopperOptions> {
  targetElement: HTMLElement | null;
  target: React.ReactNode | ((props: { open: boolean }) => React.ReactNode);
  children: React.ReactNode;
  className?: string;
  wrapperClass?: string;
  value: Value;
  onChange: (value: Value) => void;
}

function DropdownSelect<Value>({
  children,
  targetElement,
  target,
  value,
  onChange,
  className,
  wrapperClass,
  ...popperOptions
}: Props<Value>) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          {typeof target == 'function' ? target({ open }) : target}

          <Popper
            isOpen={open}
            targetElement={targetElement}
            popperOptions={popperOptions}
            className={wrapperClass}
          >
            <div
              className={classNames(
                'rounded-md bg-white border border-gray-200 overflow-hidden shadow-lg',
                className
              )}
            >
              <Listbox.Options
                static
                className="max-h-64 py-1 text-base leading-6 overflow-auto focus:outline-none sm:text-sm sm:leading-5"
              >
                {children}
              </Listbox.Options>
            </div>
          </Popper>
        </>
      )}
    </Listbox>
  );
}

export default DropdownSelect;
