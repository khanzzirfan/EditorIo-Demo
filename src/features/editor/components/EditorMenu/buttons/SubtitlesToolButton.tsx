import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import SideMenuButton from '../../ui/SideMenuButton';
import SubtitlesIcon from '../../../../../components/ui/Icons/SubtitlesIcon';
import { EditorPanel } from '../../../interfaces/Editor';
import { activePanelState } from '../../../state/atoms/editor';
import { isEitherPanelActiveSelector } from '../../../state/selectors/editor';

function SubtitlesToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const selected = useRecoilValue(
    isEitherPanelActiveSelector([EditorPanel.Subtitles]),
  );

  const handleClick = () => {
    setActivePanel(EditorPanel.Subtitles);
  };

  return (
    <SideMenuButton
      onClick={handleClick}
      selected={selected}
      icon={SubtitlesIcon}
    >
      Subtitles
    </SideMenuButton>
  );
}

export default SubtitlesToolButton;
