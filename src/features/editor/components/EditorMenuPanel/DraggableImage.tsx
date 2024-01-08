/* eslint-disable @next/next/no-img-element */
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDrag } from 'react-dnd';
import { SwiperSlide } from 'swiper/react';

import { DROPTYPES } from '../../constants';

export interface DraggableImageProps {
  src: string;
  id: string;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

export const DraggableImage = (props: DraggableImageProps) => {
  const { src, id, onAdd, onRemove } = props;
  const [{ isDragging }, drag] = useDrag({
    type: DROPTYPES.IMAGE,
    item: { id: id, type: DROPTYPES.IMAGE },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleOnAdd = () => {
    onAdd(id);
  };

  // implement long click to drag
  const handleOnRemove = () => {
    onRemove(id);
  };

  const opacity = isDragging ? 0.6 : 1;
  return (
    <SwiperSlide style={{ opacity }}>
      <img src={src} ref={drag} alt='editing-image' />
      <div className='absolute top-2 right-2 flex flex-col space-y-2'>
        <button onClick={handleOnRemove} title='remove'>
          <TrashIcon className='h-4 w-4 text-red-500' />
        </button>
        <button onClick={handleOnAdd} title='add to canvas'>
          <PlusCircleIcon className='h-4 w-4 text-gray-500' />
        </button>
      </div>
    </SwiperSlide>
  );
};
