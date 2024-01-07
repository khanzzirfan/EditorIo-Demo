import React from 'react';
import { useRecoilValue } from 'recoil';

import SubtitleRenderer from './SubtitleRenderer';
import { subtitleIdsState } from '../../state/atoms/template';

function Subtitles() {
  const elementIds = useRecoilValue(subtitleIdsState);
  return (
    <>
      {elementIds.map((id) => (
        <SubtitleRenderer key={id} id={id} />
      ))}
    </>
  );
}

export default Subtitles;
