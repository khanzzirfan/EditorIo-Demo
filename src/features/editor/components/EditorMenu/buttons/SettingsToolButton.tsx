import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import SideMenuButton from '../../ui/SideMenuButton';
import { EditorPanel } from '../../../interfaces/Editor';
import { activePanelState } from '../../../state/atoms/editor';
import { isEitherPanelActiveSelector } from '../../../state/selectors/editor';

function SettingsToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const selected = useRecoilValue(
    isEitherPanelActiveSelector([EditorPanel.Settings]),
  );

  const handleClick = () => {
    setActivePanel(EditorPanel.Settings);
  };

  return (
    <SideMenuButton
      onClick={handleClick}
      selected={selected}
      icon={AdjustmentsIcon}
    >
      Settings
    </SideMenuButton>
  );
}

export default SettingsToolButton;
