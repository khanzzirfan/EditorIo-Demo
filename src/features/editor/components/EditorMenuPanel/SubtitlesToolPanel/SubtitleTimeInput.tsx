import IMask from 'imask';
import React, { useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';

import Tooltip from '../../../../../components/ui/Tooltip/Tooltip';
import {
  dateToTimeString,
  formatTime,
  parseTime,
  timeStringToDate,
} from '../../../../../utils/time';

interface Props {
  id: string;
  value: number;
  label: string;
  onChange: (value: number) => void;
  icon: React.ReactNode;
}

function SubtitleTimeInput({ id, label, value, onChange, icon }: Props) {
  const [inputValue, setInputValue] = useState(() => formatTime(value));

  useEffect(() => {
    setInputValue(formatTime(value));
  }, [value]);

  const handleBlurEnd = () => {
    const newValue = parseTime(inputValue);
    if (isNaN(newValue)) {
      setInputValue(formatTime(value));
    } else {
      onChange(newValue);
    }
  };

  // TODO: mask for longer videos than 1 hour
  return (
    <span className="px-1 flex items-center rounded-md border border-transparent hover:border-gray-200 focus-within:border-gray-200 focus-within:bg-gray-50 focus-within:text-gray-900 transition duration-150">
      <Tooltip content={label}>
        <label htmlFor={id} className="cursor-pointer">
          {icon}
        </label>
      </Tooltip>
      <IMaskInput
        id={id}
        mask={Date}
        radix="."
        lazy={false}
        pattern="mm:ss.m1"
        className="bg-transparent w-12 h-6 text-xs focus:outline-none"
        blocks={{
          mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
          },
          ss: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
          },
          m1: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 9,
          },
        }}
        value={inputValue}
        onAccept={setInputValue}
        format={(date: Date) =>
          dateToTimeString(date, { optHours: true, shortMillis: true })
        }
        parse={(str: string) =>
          timeStringToDate(str, { optHours: true, shortMillis: true })
        }
        onBlur={handleBlurEnd}
      />
    </span>
  );
}

export default SubtitleTimeInput;
