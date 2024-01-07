// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { without } from 'ramda';
import { useCallback, useRef } from 'react';
import { useBeforeUnload } from 'react-use';
import { useRecoilCallback } from 'recoil';

import { Template } from '../features/editor/interfaces/StageConfig';
import { audioState } from '../features/editor/state/atoms/audio';
import { progressModalState } from '../features/editor/state/atoms/ui';
import { templateSelector } from '../features/editor/state/selectors/template';
import { toTemplateJSON } from '../features/editor/utils/template';
import {
  deserializeVideoDTO,
  deserializeVideosDTO,
  ExportVideoDTO,
  VideosDTO,
} from '../interfaces/videos';
import { videoIdsState } from '../state/atoms/videos';
import useVideosDispatcher from '../state/dispatchers/videos';
import { isLoggedInSelector } from '../state/selectors/user';
import { videoSelector } from '../state/selectors/videos';
import { api, getAuthHeaders } from '../utils/api/api';
import { uuid } from '../utils/uuid';

function useVideos() {
  const { setVideosLoaded } = useVideosDispatcher();
  const exportingRef = useRef<string[]>([]);

  const hasExporting = useCallback(() => !!exportingRef.current.length, []);

  useBeforeUnload(hasExporting, 'Operation in progress, are you sure?');

  const fetchVideosByIds = useCallback(
    (ids: string[]) =>
      api
        .get<VideosDTO>('/videos', {
          params: {
            ids,
          },
        })
        .then((res) => res.data)
        .then(deserializeVideosDTO)
        .then(setVideosLoaded),
    [setVideosLoaded],
  );

  const fetchInitialVideos = useRecoilCallback(
    ({ snapshot }) =>
      () =>
        snapshot.getPromise(videoIdsState).then(fetchVideosByIds),
    [fetchVideosByIds],
  );

  const fetchPollingVideos = useRecoilCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ({ snapshot }) =>
      async () => {},
    [fetchVideosByIds],
  );

  const exportVideo = useRecoilCallback(
    ({ set, snapshot }) =>
      async (audioBuffer?: Blob, template?: Template) => {
        const pregeneratedId = uuid('__export');
        try {
          exportingRef.current.push(pregeneratedId);
          set(progressModalState, { visible: true, taskId: pregeneratedId });
          const isLoggedIn = snapshot
            .getLoadable(isLoggedInSelector)
            .getValue();
          const [templateJSON, currentAudio, headers] = await Promise.all([
            toTemplateJSON(
              template ?? (await snapshot.getPromise(templateSelector)),
            ),
            audioBuffer ??
              (await snapshot
                .getPromise(audioState)
                .then((audio) => audio!.data)),
            isLoggedIn ? getAuthHeaders() : undefined,
          ]);

          if (audioBuffer) {
            set(audioState, {
              url: URL.createObjectURL(audioBuffer),
              data: audioBuffer,
            });
          }

          const formData = new FormData();
          formData.set('audio', currentAudio);
          formData.set(
            'template',
            new Blob([templateJSON], {
              type: 'application/json',
            }),
          );

          const { data } = await api.post<ExportVideoDTO>('/export', formData, {
            headers,
          });

          set(progressModalState, (state) =>
            state.taskId === pregeneratedId
              ? { ...state, taskId: data.id }
              : state,
          );
          set(videoSelector(data.id), deserializeVideoDTO(data.video));
          return data;
        } catch (e) {
          set(progressModalState, (state) =>
            state.taskId === pregeneratedId ? { ...state, error: true } : state,
          );
          throw e;
        } finally {
          exportingRef.current = without(
            [pregeneratedId],
            exportingRef.current,
          );
        }
      },
    [],
  );

  return {
    exportVideo,
    fetchVideosByIds,
    fetchInitialVideos,
    fetchPollingVideos,
  };
}

export default useVideos;
