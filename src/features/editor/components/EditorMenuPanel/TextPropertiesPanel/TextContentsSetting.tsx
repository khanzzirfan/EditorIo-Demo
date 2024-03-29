import React from 'react';
import { useRecoilValue } from 'recoil';

import SideMenuSetting from '../../ui/SideMenuSetting';
import { TextConfig } from '../../../interfaces/Shape';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';

interface Props {
  elementId: string;
}

function TextContentsSetting({ elementId }: Props) {
  const elementProps = useRecoilValue(
    elementPropsSelector<TextConfig>(elementId)
  );
  const { updateElementProps } = useElementsDispatcher();

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateElementProps<TextConfig>(elementId, { text: e.target.value });
  };

  return (
    <SideMenuSetting label="Content">
      <textarea
        rows={3}
        className="panel-item focus:outline-none focus:ring-0"
        value={elementProps.text}
        onChange={handleChangeText}
      />
    </SideMenuSetting>
  );
}

export default TextContentsSetting;
