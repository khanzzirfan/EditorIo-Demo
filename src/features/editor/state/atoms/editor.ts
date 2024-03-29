import Konva from 'konva';
import { atom } from 'recoil';

import { untrackedHistoryEffect } from '../effects/history';
import { EditorPanel } from '../../interfaces/Editor';
import { Template } from '../../interfaces/StageConfig';

export const zoomState = atom({
  key: 'zoomState',
  default: 1,
});

export const activePanelState = atom<EditorPanel>({
  key: 'activePanelState',
  default: EditorPanel.Settings,
  effects_UNSTABLE: [untrackedHistoryEffect],
});

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
});

export const lastSavedTemplateState = atom<Template | undefined>({
  key: 'lastSavedTemplateState',
  default: undefined,
});

export const selectedElementIdState = atom<string | undefined>({
  key: 'selectedElementIdState',
  default: undefined,
  effects_UNSTABLE: [untrackedHistoryEffect],
});

export const highlightedElementIdState = atom<string | undefined>({
  key: 'highlightedElementIdState',
  default: undefined,
});

export const guideLinesState = atom<Konva.LineConfig[]>({
  key: 'guideLinesState',
  default: [],
});
