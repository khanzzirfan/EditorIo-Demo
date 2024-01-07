import React from 'react';
import { RGBColor } from 'react-color';
import { useRecoilValue } from 'recoil';

import PanelColorPicker from '../../ui/PanelColorPicker';
import SideMenuSetting from '../../ui/SideMenuSetting';
import { fromRgba, toRgba } from '../../../../../utils/color';
import { backgroundState } from '../../../state/atoms/template';
import useTemplateDispatcher from '../../../state/dispatchers/template';

function BackgroundColorSetting() {
  const { updateBackground } = useTemplateDispatcher();
  const background = useRecoilValue(backgroundState);

  const handleChangeColor = (color: RGBColor) => {
    updateBackground({
      fill: toRgba(color),
    });
  };

  return (
    <SideMenuSetting label="Background" htmlFor="input-background-color">
      <PanelColorPicker
        rgba={background.fill ? fromRgba(background.fill) : undefined}
        id="input-background-color"
        onChange={handleChangeColor}
        disableAlpha
      />
    </SideMenuSetting>
  );
}

export default BackgroundColorSetting;
