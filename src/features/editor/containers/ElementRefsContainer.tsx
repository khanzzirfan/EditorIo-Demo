import Konva from 'konva';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { createContainer } from 'unstated-next';

import { elementIdsState, subtitleIdsState } from '../state/atoms/template';
import { isTruthy } from '../../../utils/boolean';

export type ElementRefs = Record<
  string,
  | {
      ref: Konva.Shape;
      transformerProps?: Partial<Konva.TransformerConfig>;
    }
  | undefined
>;

function useElementRefsState() {
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const elementIds = useRecoilValue(elementIdsState);
  const subtitleIds = useRecoilValue(subtitleIdsState);
  const [elementRefs, setElementRefs] = useState<ElementRefs>({});

  const setElementRef = useCallback(
    (
      id: string,
      ref?: Konva.Shape,
      transformerProps?: Partial<Konva.TransformerConfig>,
    ) => {
      setElementRefs((elementRefs) => ({
        ...elementRefs,
        [id]: ref && { ref, transformerProps },
      }));
    },
    [],
  );

  const elementNodes = useMemo(
    () =>
      [...subtitleIds, ...elementIds]
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        .map((elementId) => elementRefs[elementId]?.ref!)
        .filter(isTruthy),
    [elementIds, elementRefs, subtitleIds],
  );

  return useMemo(
    () => ({ transformerRef, elementRefs, setElementRef, elementNodes }),
    [elementRefs, elementNodes, setElementRef],
  );
}

export const ElementRefsContainer = createContainer(useElementRefsState);
