import React from 'react';

import classNames from '../../../../utils/classNames';

interface IconButtonProps {
  onClick: (id: string) => void;
  children: React.ReactNode;
  color: 'green' | 'red' | 'gray' | 'yellow' | 'blue';
  id: string;
}

export const IconButton = (props: IconButtonProps) => {
  const { onClick, children, color = 'gray', id } = props;
  const handleClick = () => {
    onClick(id);
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={classNames(
        'px-0 py-0 text-xs font-medium text-center inline-flex items-center text-white',
        color === 'gray' &&
          'bg-gray-500 rounded-sm hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800',
        color === 'red' &&
          'bg-red-500 rounded-sm hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
      )}
    >
      {children}
    </button>
  );
};
