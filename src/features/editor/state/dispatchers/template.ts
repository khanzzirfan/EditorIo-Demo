import Konva from 'konva';
import { useRecoilCallback } from 'recoil';

import {
  activePanelState,
  isLoadingState,
  lastSavedTemplateState,
  zoomState,
} from '../atoms/editor';
import { historyPresentState, historyState } from '../atoms/history';
import { backgroundState } from '../atoms/template';
import { templateSelector } from '../selectors/template';
import { Dimensions, Template } from '../../interfaces/StageConfig';

function useTemplateDispatcher() {
  const updateBackground = useRecoilCallback(
    ({ set }) => (background: Konva.ShapeConfig) => {
      set(backgroundState, (config) => ({ ...config, ...background }));
    },
    []
  );

  const setCurrentTemplateSaved = useRecoilCallback(
    ({ set, snapshot }) => async () => {
      const template = await snapshot.getPromise(templateSelector);
      set(lastSavedTemplateState, template);
      return template;
    },
    []
  );

  const setLoadedTemplate = useRecoilCallback(
    ({ set, reset }) => (template: Template, screenDimensions: Dimensions) => {
      const canvasHeight = template.dimensions.height;
      const canvasWidth = template.dimensions.width;
      const zoom = Math.min(
        screenDimensions.height / canvasHeight,
        screenDimensions.width / canvasWidth
      );
      set(isLoadingState, false);
      set(templateSelector, template);
      set(lastSavedTemplateState, template);
      reset(activePanelState);
      set(zoomState, zoom);
      reset(historyState);
      reset(historyPresentState);
    },
    []
  );

  return {
    setCurrentTemplateSaved,
    setLoadedTemplate,
    updateBackground,
  };
}

export default useTemplateDispatcher;
