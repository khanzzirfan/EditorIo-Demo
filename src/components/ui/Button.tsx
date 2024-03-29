import React, { forwardRef } from 'react';

import Loader from './Loader/Loader';
import classNames from '../../utils/classNames';

export interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'type' | 'disabled'
  > {
  icon?: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
  loading?: boolean;
  type?:
    | 'primary'
    | 'secondary'
    | 'gray'
    | 'dark'
    | 'accented'
    | 'danger'
    | 'custom'
    | 'link'
    | 'link-light';
  buttonType?: 'button' | 'submit' | 'reset';
  round?: boolean;
  disabled?: boolean | 'soft';
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      type = 'primary',
      buttonType = 'button',
      icon: IconComponent,
      children,
      loading,
      disabled,
      className,
      onClick,
      round,
      tabIndex,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = !!disabled;

    return (
      <button
        ref={ref}
        type={buttonType}
        disabled={disabled !== 'soft' && (loading || isDisabled)}
        tabIndex={isDisabled ? -1 : tabIndex}
        onClick={loading || isDisabled ? undefined : onClick}
        className={classNames(
          'button-default',
          !type.startsWith('link') &&
            type !== 'custom' &&
            'py-2 border focus:outline-none',
          !type.startsWith('link') &&
            type !== 'custom' &&
            !round &&
            'rounded-md px-4',
          round && 'rounded-full px-2',
          type === 'link' &&
            (isDisabled
              ? 'text-gray-400'
              : 'text-blue-600 hover:text-blue-400 focus:outline-none focus:underline'),
          type === 'link-light' &&
            'text-blue-400 hover:text-blue-500 focus:outline-none focus:underline',
          type === 'danger' &&
            'border-transparent bg-red-600 text-white hover:bg-red-500 focus:border-red-700 active:bg-red-700',
          type === 'primary' &&
            (isDisabled
              ? 'border-transparent bg-gray-200 text-gray-400'
              : 'border-transparent bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 focus:ring-blue-300 focus:ring-2'),
          type === 'secondary' &&
            'border-gray-300 bg-white text-gray-700 focus:ring-blue-300 hover:text-gray-500 focus:border-blue-300 active:bg-gray-100 focus:ring-2',
          type === 'accented' &&
            'text-blue-700 bg-blue-100 border-blue-300 focus:ring-blue-300 hover:bg-blue-50 focus:outline-none active:bg-blue-200 focus:ring-2',
          type === 'gray' &&
            'border border-transparent bg-gray-100 text-gray-800 focus:ring-gray-300 hover:text-gray-900 hover:bg-gray-200 focus:ring-2',
          type === 'dark' &&
            'border border-transparent bg-gray-900 text-gray-100 hover:bg-gray-700 focus:bg-gray-700 focus:ring-gray-500 focus-visible:ring-2',
          isDisabled && 'cursor-default',
          className,
        )}
        {...rest}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {IconComponent && (
              <IconComponent
                className={classNames('h-5 w-5', !!children && '-ml-1 mr-2')}
              />
            )}
            {children}
          </>
        )}
      </button>
    );
  },
);

export default Button;
