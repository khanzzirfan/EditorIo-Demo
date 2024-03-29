import { equals } from 'ramda';
import React from 'react';
import { useRecoilValue } from 'recoil';

import AspectRatioOption from './AspectRatioOption';
import useDropdown from '../../../../../../components/ui/Dropdown/useDropdown';
import DropdownSelect from '../../../../../../components/ui/DropdownSelect/DropdownSelect';
import DropdownSelectAnchor from '../../../../../../components/ui/DropdownSelect/DropdownSelectAnchor';
import Tooltip from '../../../../../../components/ui/Tooltip/Tooltip';
import classNames from '../../../../../../utils/classNames';
import { EditorAreaContainer } from '../../../../containers/EditorAreaContainer';
import { dimensionsState } from '../../../../state/atoms/template';
import useEditorDispatcher from '../../../../state/dispatchers/editor';
import SideMenuSetting from '../../../ui/SideMenuSetting';

export const options = [
  {
    dimensions: { width: 1080, height: 1920 },
    orientation: 'Portrait',
    description: 'Instagram & Facebook stories, Snapchat and TikTok',
    ratio: '9:16',
  },
  {
    dimensions: { width: 1536, height: 1920 },
    orientation: 'Portrait',
    description: 'Twitter, Instagram and Facebook',
    ratio: '4:5',
  },
  {
    dimensions: { width: 1080, height: 1080 },
    orientation: 'Square',
    description: 'Twitter, Instagram and Facebook',
    ratio: '1:1',
  },
  {
    dimensions: { width: 1920, height: 1536 },
    orientation: 'Landscape',
    description: 'Twitter, Instagram and Facebook',
    ratio: '5:4',
  },
  {
    dimensions: { width: 1920, height: 1080 },
    orientation: 'Landscape',
    description: 'Youtube and websites',
    ratio: '16:9',
  },
];

// TODO: select by id or unique key
function AspectRatioSetting() {
  const { getScreenDimensions } = EditorAreaContainer.useContainer();
  const { setTargetElement, targetElement } = useDropdown();
  const dimensions = useRecoilValue(dimensionsState);
  const { setCanvasDimensions } = useEditorDispatcher();

  const selectedOption = options.find((option) =>
    equals(dimensions, option.dimensions)
  )!;

  const handleChangeOption = (value: string) => {
    const { dimensions } = options.find(({ ratio }) => ratio === value)!;
    setCanvasDimensions(dimensions, getScreenDimensions());
  };

  return (
    <SideMenuSetting label="Size">
      <div ref={setTargetElement}>
        <DropdownSelect
          placement="bottom"
          value={selectedOption.ratio}
          onChange={handleChangeOption}
          targetElement={targetElement}
          wrapperClass="w-68"
          target={({ open }) => (
            <DropdownSelectAnchor
              className={classNames('panel-item', open && 'border-blue-300')}
            >
              {selectedOption?.orientation} {selectedOption?.ratio}
            </DropdownSelectAnchor>
          )}
        >
          {options.map(({ dimensions, orientation, ratio, description }) => (
            <Tooltip
              key={`${dimensions.width}x${dimensions.height}`}
              content={description}
              placement="right"
            >
              <AspectRatioOption
                dimensions={dimensions}
                orientation={orientation}
                value={ratio}
              />
            </Tooltip>
          ))}
        </DropdownSelect>
      </div>
    </SideMenuSetting>
  );
}

export default AspectRatioSetting;
