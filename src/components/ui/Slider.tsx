import React from 'react';
import { getTrackBackground, Range } from 'react-range';

interface Props {
  value: number;
  min?: number;
  max: number;
  step: number;
  onChange?: (value: number) => void;
}

function Slider({ min = 0, max = 100, onChange, value, step }: Props) {
  return (
    <Range
      step={step}
      min={0}
      max={max}
      values={[value]}
      onChange={([value]) => onChange?.(value || 0)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className='h-1.5 w-full rounded-full'
          style={{
            ...props.style,
            background: getTrackBackground({
              min,
              max,
              values: [value],
              colors: ['rgb(147 197 253)', 'rgb(243 244 246)'],
            }),
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className='w-4 h-4 bg-white shadow border rounded-full focus:outline-none'
        />
      )}
    />
  );
}

export default Slider;
