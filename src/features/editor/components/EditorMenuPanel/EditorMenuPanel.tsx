import React from 'react';
import { useRecoilValue } from 'recoil';

import ImagePropertiesPanel from './ImagePropertiesPanel/ImagePropertiesPanel';
import ImageToolPanel from './ImageToolPanel';
import SettingsToolPanel from './SettingsToolPanel/SettingsToolPanel';
import TextPropertiesPanel from './TextPropertiesPanel/TextPropertiesPanel';
import TextToolPanel from './TextToolPanel';
import SideMenuPanel from '../ui/SideMenuPanel';
import { EditorPanel } from '../../interfaces/Editor';
import {
  activePanelState,
  selectedElementIdState,
} from '../../state/atoms/editor';

function EditorMenuPanel() {
  const activePanel = useRecoilValue(activePanelState);
  const selectedElementId = useRecoilValue(selectedElementIdState);

  if (selectedElementId) {
    switch (activePanel) {
      case EditorPanel.ImageProperties:
        return <ImagePropertiesPanel elementId={selectedElementId} />;
      case EditorPanel.TextProperties:
        return <TextPropertiesPanel elementId={selectedElementId} />;
    }
  }

  switch (activePanel) {
    case EditorPanel.Settings:
      return <SettingsToolPanel />;
    case EditorPanel.Text:
      return <TextToolPanel />;
    case EditorPanel.Image:
      return <ImageToolPanel />;
    default:
      return <SideMenuPanel />;
  }
}

export default EditorMenuPanel;
