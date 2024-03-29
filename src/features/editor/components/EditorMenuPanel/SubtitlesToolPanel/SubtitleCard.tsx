import { ClockIcon, TrashIcon } from '@heroicons/react/outline';
import React, { ChangeEvent } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import SubtitleTimeInput from './SubtitleTimeInput';
import PanelActionButton from '../../ui/PanelActionButton';
import Tooltip from '../../../../../components/ui/Tooltip/Tooltip';
import classNames from '../../../../../utils/classNames';
import { AudioControlsContainer } from '../../../containers/AudioControlsContainer';
import { Subtitle } from '../../../interfaces/Subtitles';
import { audioProgressState } from '../../../state/atoms/audio';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import useSubtitlesDispatcher from '../../../state/dispatchers/subtitles';

interface Props {
  subtitle: Subtitle;
}

function SubtitleCard({ subtitle }: Props) {
  const { updateSubtitle } = useSubtitlesDispatcher();
  const { deleteElement, selectElement } = useElementsDispatcher();
  const audioProgress = useRecoilValue(audioProgressState);
  const { wavesurferRef } = AudioControlsContainer.useContainer();

  const isActive =
    audioProgress >= subtitle.start && audioProgress < subtitle.end;

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateSubtitle(subtitle.id, { text: e.target.value });
  };

  const handleFocusSubtitle = useRecoilCallback(
    ({ set }) => () => {
      selectElement(subtitle.id);

      if (wavesurferRef.current) {
        wavesurferRef.current.setCurrentTime(subtitle.start);
      } else {
        set(audioProgressState, subtitle.start);
      }
    },
    [selectElement, subtitle.id, subtitle.start, wavesurferRef]
  );

  const handleChangeStart = (value: number) => {
    const start = Math.min(subtitle.end, value);
    updateSubtitle(subtitle.id, {
      start,
    });
  };

  const handleChangeEnd = (value: number) => {
    const end = Math.max(subtitle.start, value);
    updateSubtitle(subtitle.id, {
      end,
    });
  };

  // TODO: mask for longer videos than 1 hour
  return (
    <div
      className={classNames(
        'panel-item flex flex-col mb-3',
        isActive && 'border-gray-400'
      )}
    >
      <div className="text-gray-400 flex items-center justify-between">
        <div className="flex items-center">
          <SubtitleTimeInput
            id={`${subtitle.id}_start`}
            value={subtitle.start}
            label="Start time"
            onChange={handleChangeStart}
            icon={<ClockIcon className="w-4 h-4 mr-1" />}
          />

          <span className="border-l mx-1.5 h-6" />

          <SubtitleTimeInput
            id={`${subtitle.id}_end`}
            value={subtitle.end}
            label="End time"
            onChange={handleChangeEnd}
            icon={<ClockIcon className="w-4 h-4 mr-1 transform -scale-x-1" />}
          />
        </div>
        <Tooltip content="Delete">
          <PanelActionButton
            type="white"
            icon={TrashIcon}
            onClick={() => deleteElement(subtitle.id)}
          />
        </Tooltip>
      </div>
      <textarea
        rows={3}
        className="border-0 -mx-3 -mb-2 px-3 py-2 bg-transparent sm:text-sm sm:leading-5 focus:outline-none focus:ring-0"
        value={subtitle.text}
        onChange={handleChangeText}
        onFocus={handleFocusSubtitle}
      />
    </div>
  );
}

export default SubtitleCard;
