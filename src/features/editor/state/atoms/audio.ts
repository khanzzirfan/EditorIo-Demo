import { atom } from 'recoil';

import { historyEffect } from '../effects/history';
import { AudioState } from '../../interfaces/Audio';

export const audioState = atom<AudioState | undefined>({
  key: 'audioState',
  default: undefined,
  effects_UNSTABLE: [historyEffect],
});

/**
 * Progress in seconds (decimal milliseconds)
 */
export const audioProgressState = atom({
  key: 'audioProgressState',
  default: 0,
});
