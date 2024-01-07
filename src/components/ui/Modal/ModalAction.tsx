import React, { forwardRef } from 'react';

import Button, { Props as ButtonProps } from '../Button';
import classNames from '../../../utils/classNames';

const ModalAction = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Button
        className={classNames('w-full shadow-sm', className)}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default ModalAction;
