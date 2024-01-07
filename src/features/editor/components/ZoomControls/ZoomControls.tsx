/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { useMedia } from 'react-use';
import { useRecoilState } from 'recoil';

import ClearButton from '../ui/ClearButton';
import useZoomControls from '../../hooks/useZoomControls';
import { zoomState } from '../../state/atoms/editor';
import useDropdown from '../../../../components/ui/Dropdown/useDropdown';
import DropdownMenu from '../../../../components/ui/DropdownMenu/DropdownMenu';
import DropdownMenuAnchor from '../../../../components/ui/DropdownMenu/DropdownMenuAnchor';
import DropdownMenuButton from '../../../../components/ui/DropdownMenu/DropdownMenuButton';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import classNames from '../../../../utils/classNames';

function ZoomControls() {
  const [zoom, setZoom] = useRecoilState(zoomState);
  const { fillToScreen, fitToScreen } = useZoomControls();
  const { setTargetElement, targetElement } = useDropdown();
  // Define breakpoints for extra-small, small, medium, and large screens
  const isExtraSmallScreen = useMedia('(max-width: 480px)');
  const isSmallScreen = useMedia('(min-width: 481px) and (max-width: 640px)');
  const isMd = useMedia('(min-width: 641px) and (max-width: 768px)');
  const isMediumScreen = useMedia('(min-width: 769px) and (max-width: 1024px)');
  const isLargeScreen = useMedia('(min-width: 1025px)');

  // implement responsive design for zoom controls using use effect change the zoom levels
  // based on the screen size
  React.useEffect(() => {
    if (isExtraSmallScreen) {
      setZoom(0.25);
    } else if (isSmallScreen) {
      setZoom(0.25);
    } else if (isMd) {
      setZoom(0.25);
    } else if (isMediumScreen) {
      setZoom(0.5);
    } else if (isLargeScreen) {
      setZoom(0.75);
    }
  }, [
    isExtraSmallScreen,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isMd,
    setZoom,
  ]);

  return (
    <DropdownMenu
      placement='bottom'
      targetElement={targetElement}
      target={({ open }) => (
        <div ref={setTargetElement}>
          <Tooltip content='Zoom' className='mt-auto' closed={open}>
            {/* @ts-ignore */}
            <DropdownMenuAnchor
              as={ClearButton}
              className={classNames(
                'px-2.5',
                open && 'bg-gray-100 ring-gray-300 ring-2',
              )}
            >
              {Math.floor(zoom * 100)}%
            </DropdownMenuAnchor>
          </Tooltip>
        </div>
      )}
    >
      <div className='overflow-y-auto divide-y divide-gray-100'>
        <div>
          {[3, 2, 1.25, 1, 0.75, 0.5, 0.25, 0.1].map((scale) => (
            <DropdownMenuButton onClick={() => setZoom(scale)} key={scale}>
              {scale * 100}%
            </DropdownMenuButton>
          ))}
        </div>
        <div>
          <DropdownMenuButton onClick={fitToScreen}>Fit</DropdownMenuButton>
          <DropdownMenuButton onClick={fillToScreen}>Fill</DropdownMenuButton>
        </div>
      </div>
    </DropdownMenu>
  );
}

export default ZoomControls;
