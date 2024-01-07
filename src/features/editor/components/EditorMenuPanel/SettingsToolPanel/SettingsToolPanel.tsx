import React from 'react';

import AspectRatioSetting from './AspectRatioSetting/AspectRatioSetting';
import BackgroundColorPanelItem from './BackgroundColorSetting';
import SideMenuPanel from '../../ui/SideMenuPanel';

function SettingsToolPanel() {
  return (
    <SideMenuPanel title='Settings'>
      <AspectRatioSetting />
      <BackgroundColorPanelItem />
    </SideMenuPanel>
  );
}

export default SettingsToolPanel;
