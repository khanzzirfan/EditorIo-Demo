/* eslint-disable @typescript-eslint/ban-ts-comment */
import Konva from 'konva';
// @ts-ignore
import { Filter } from 'konva/types/Node';
import React from 'react';
import { useRecoilValue } from 'recoil';

import SideMenuSetting from '../../ui/SideMenuSetting';
import Slider from '../../../../../components/ui/Slider';
import { ImageConfig } from '../../../interfaces/Shape';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';

interface Props {
  elementId: string;
}

function ImageBlurSetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<ImageConfig>(elementId),
  );

  // TODO: maybe save filter as string in template and let renderer handle conversion
  const handleChangeBlur = async (blurRadius: number) => {
    let filters: Filter[] | undefined = undefined;

    const hasBlurFilter = elementProps.filters?.includes(Konva.Filters.Blur);

    if (blurRadius > 0 && !hasBlurFilter) {
      filters = [...(elementProps.filters ?? []), Konva.Filters.Blur];
    } else if (!blurRadius && hasBlurFilter) {
      filters = elementProps.filters?.filter(
        (filter) => filter !== Konva.Filters.Blur,
      );
    }

    updateElementProps<ImageConfig>(
      elementId,
      filters
        ? {
            blurRadius,
            filters,
          }
        : { blurRadius },
    );
  };

  const blurRadius = elementProps.blurRadius;

  return (
    <>
      <SideMenuSetting label='Blur'>
        <div className='panel-item py-3 flex w-full items-center'>
          <Slider
            max={20}
            value={blurRadius}
            step={1}
            onChange={handleChangeBlur}
          />
          <span className='text-xs w-20 ml-1 text-right leading-3'>
            {blurRadius}px
          </span>
        </div>
      </SideMenuSetting>
    </>
  );
}

export default ImageBlurSetting;
