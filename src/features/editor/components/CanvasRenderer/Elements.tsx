import React from 'react';
import { useRecoilValue } from 'recoil';

import ElementRenderer from './ElementRenderer';
import { elementIdsState } from '../../state/atoms/template';

function Elements() {
  const elementIds = useRecoilValue(elementIdsState);
  return (
    <>
      {elementIds.map((id) => (
        <ElementRenderer key={id} id={id} />
      ))}
    </>
  );
}

export default Elements;
