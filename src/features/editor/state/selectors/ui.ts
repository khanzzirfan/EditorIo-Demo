import { selector } from 'recoil';

import { imagesState, progressModalState } from '../atoms/ui';
import { Video } from '../../../../interfaces/videos';
import { videoState } from '../../../../state/atoms/videos';

export const progressVideoSelector = selector<Video | undefined>({
  key: 'generatingVideoSelector',
  get: ({ get }) => {
    const { taskId } = get(progressModalState);
    return taskId ? get(videoState(taskId)) : undefined;
  },
});

export const imagesSelector = selector({
  key: 'imagesSelector',
  get: ({ get }) => get(imagesState),
});
