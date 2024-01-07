import { Menu } from '@headlessui/react';
import { Options as PopperOptions } from '@popperjs/core';
import React from 'react';

import Popper from '../Popper';
import classNames from '../../../utils/classNames';

interface Props extends Partial<PopperOptions> {
  className?: string;
  targetElement: HTMLElement | null;
  target: React.ReactNode | ((props: { open: boolean }) => React.ReactNode);
  children: React.ReactNode;
}

function DropdownMenu({
  className,
  children,
  targetElement,
  target,
  ...popperOptions
}: Props) {
  return (
    <Menu>
      {({ open }: { open: boolean }) => (
        <>
          {typeof target == 'function' ? target({ open }) : target}

          <Popper
            isOpen={open}
            targetElement={targetElement}
            popperOptions={popperOptions}
          >
            <Menu.Items
              static
              className={classNames(
                'outline-none overflow-hidden bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg',
                className
              )}
            >
              {children}
            </Menu.Items>
          </Popper>
        </>
      )}
    </Menu>
  );
}

export default DropdownMenu;
