import React from 'react';

import TextContentsSetting from './TextContentsSetting';
import ShapeActions from '../ShapeActions/ShapeActions';
import FontFamilySetting from '../TextProperties/FontFamilySetting/FontFamilySetting';
import FontStyleSetting from '../TextProperties/FontStyleSetting';
import LineHeightSetting from '../TextProperties/LineHeightSetting';
import TextAlignmentSetting from '../TextProperties/TextAlignementSetting';
import TextBackgroundSetting from '../TextProperties/TextBackgroundSetting';
import TextFillSetting from '../TextProperties/TextFillSetting';
import TextShadowSetting from '../TextProperties/TextShadowSetting';
import TextSizeSetting from '../TextProperties/TextSizeSetting';
import TextStrokeSetting from '../TextProperties/TextStrokeSetting';
import SideMenuPanel from '../../ui/SideMenuPanel';
import { EditorPanel } from '../../../interfaces/Editor';

interface Props {
  elementId: string;
}

function TextPropertiesPanel({ elementId }: Props) {
  return (
    <SideMenuPanel
      title="Text"
      previous={EditorPanel.Text}
      actions={<ShapeActions elementId={elementId} />}
    >
      <TextContentsSetting elementId={elementId} />
      <FontFamilySetting elementId={elementId} />
      <div className="flex space-x-2">
        <FontStyleSetting elementId={elementId} />
        <TextSizeSetting elementId={elementId} />
      </div>
      <div className="flex space-x-2">
        <TextAlignmentSetting elementId={elementId} />
        <LineHeightSetting elementId={elementId} />
      </div>
      <TextFillSetting elementId={elementId} />
      <TextBackgroundSetting elementId={elementId} />
      <TextStrokeSetting elementId={elementId} />
      <TextShadowSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default TextPropertiesPanel;
