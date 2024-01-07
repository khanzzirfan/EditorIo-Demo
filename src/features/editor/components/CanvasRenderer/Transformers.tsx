import React from 'react';
import { useRecoilValue } from 'recoil';

import TransformerRenderer from './TransformerRenderer';
import {
  highlightedElementIdState,
  selectedElementIdState,
} from '../../state/atoms/editor';
import { elementIdsState, subtitleIdsState } from '../../state/atoms/template';

function Transformers() {
  const elementIds = useRecoilValue(elementIdsState);
  const subtitleIds = useRecoilValue(subtitleIdsState);
  const selectedElementId = useRecoilValue(selectedElementIdState);
  const highlightedElementId = useRecoilValue(highlightedElementIdState);

  return (
    <>
      {[...elementIds, ...subtitleIds].map((id) => (
        <TransformerRenderer
          key={id}
          elementId={id}
          isSelected={selectedElementId === id}
          isHighlighted={highlightedElementId === id}
        />
      ))}
    </>
  );
}

export default Transformers;
