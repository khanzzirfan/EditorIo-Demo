import React from 'react';
import { useRecoilValue } from 'recoil';

import TextRenderer from './TextRenderer';
import { audioProgressState } from '../../state/atoms/audio';
import { subtitlesStyleState } from '../../state/atoms/template';
import { subtitleSelector } from '../../state/selectors/subtitles';

interface Props {
  id: string;
}

function SubtitleRenderer({ id }: Props) {
  const subtitle = useRecoilValue(subtitleSelector(id));
  const style = useRecoilValue(subtitlesStyleState);
  const audioProgress = useRecoilValue(audioProgressState);

  if (!subtitle) {
    return null;
  }

  const { text } = subtitle;

  const isActive =
    audioProgress >= subtitle.start && audioProgress < subtitle.end;

  return isActive ? (
    <TextRenderer id={id} key={id} props={{ ...style, text }} centered />
  ) : null;
}

export default SubtitleRenderer;
