import React from 'react';

import ImageBlurSetting from './ImageBlurSetting';
import ImageFileSetting from './ImageFileSetting';
import ImageFitSetting from './ImageFitSetting';
import ImageOpacitySetting from './ImageOpacitySetting';
import ShapeActions from '../ShapeActions/ShapeActions';
import SideMenuPanel from '../../ui/SideMenuPanel';
import { EditorPanel } from '../../../interfaces/Editor';

interface Props {
  elementId: string;
}

function ImagePropertiesPanel({ elementId }: Props) {
  return (
    <SideMenuPanel
      title="Image"
      previous={EditorPanel.Image}
      actions={<ShapeActions elementId={elementId} />}
    >
      <ImageFileSetting elementId={elementId} />
      <ImageOpacitySetting elementId={elementId} />
      <ImageBlurSetting elementId={elementId} />
      <ImageFitSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default ImagePropertiesPanel;
