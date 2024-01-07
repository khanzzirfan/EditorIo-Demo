/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DownloadIcon } from '@heroicons/react/outline';
import React, { useCallback, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { audioState } from '../../state/atoms/audio';
import { audioModalState } from '../../state/atoms/ui';
import useAudioDispatcher from '../../state/dispatchers/audio';
import Button from '../../../../components/ui/Button';
import useVideos from '../../../../hooks/useVideos';
import classNames from '../../../../utils/classNames';

function ExportButton() {
  const { exportVideo } = useVideos();
  const { setNewAudio } = useAudioDispatcher();
  const audio = useRecoilValue(audioState);
  const [loading, setLoading] = useState(false);

  const saveAndExportVideo = useCallback(
    async (clipBuffer: Blob) => {
      try {
        setLoading(true);
        // @ts-ignore
        const { isNewRegularUser } = await exportVideo(clipBuffer);
      } catch (e) {
        // @ts-ignore
        const errorText =
          (e as any)?.response?.data?.error || "Something's wrong";
      } finally {
        setLoading(false);
      }
    },
    [exportVideo],
  );

  const handleClickExport = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const audio = snapshot.getLoadable(audioState).getValue();

        if (!audio) {
          set(audioModalState, {
            visible: true,
            onContinue: (clipBuffer) => {
              setNewAudio(clipBuffer);
              saveAndExportVideo(clipBuffer);
            },
          });
        } else {
          saveAndExportVideo(audio.data);
        }
      },
    [saveAndExportVideo, setNewAudio],
  );

  return (
    <Button
      className={classNames('w-40', audio && 'shadow')}
      loading={loading}
      onClick={handleClickExport}
      icon={DownloadIcon}
      type={audio ? 'primary' : 'gray'}
    >
      Generate video
    </Button>
  );
}

export default ExportButton;
