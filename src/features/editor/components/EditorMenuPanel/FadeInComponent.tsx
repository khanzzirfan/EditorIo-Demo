// FadingComponent.js
import { Transition } from '@headlessui/react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';

interface FadingComponentProps {
  children: React.ReactNode;
}

const FadingComponent = ({ children }: FadingComponentProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className='flex flex-col h-full border border-gray-300'>
      <button
        onClick={toggleVisibility}
        className='flex items-center space-x-2'
      >
        {isVisible ? (
          <ChevronDoubleLeftIcon className='w-5 h-5' />
        ) : (
          <ChevronDoubleRightIcon className='w-5 h-5' />
        )}
      </button>

      <Transition
        show={isVisible}
        enter='transition-opacity duration-500'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-500'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='flex flex-col h-full flex-grow overflow-hidden'
      >
        <div className='p-1 mt-2 flex flex-col flex-grow overflow-hidden'>
          {children}
        </div>
      </Transition>
    </div>
  );
};

export default FadingComponent;
