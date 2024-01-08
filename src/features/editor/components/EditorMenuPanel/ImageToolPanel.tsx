/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
// @ts-ignore
import { useRecoilState } from 'recoil';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { DraggableImage } from './DraggableImage';
import { DropzoneFiles } from './Dropzonefiles';
import SideMenuPanel from '../ui/SideMenuPanel';
import { useDndImageUpdater } from '../../hooks/useDndImageUpdater';
import { imagesState } from '../../state/atoms/ui';

// TODO: clear images at some point (when leaving editor?)
function ImageToolPanel() {
  const [images, setImages] = useRecoilState(imagesState);
  const { handleOnAddImage, handleOnRemoveImage } = useDndImageUpdater();

  const onMediaUpload = async (acceptedFiles: any) => {
    const numberofFiles = acceptedFiles.length;
    const readFileAsDataURL = (file: any) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    };

    for (let i = 0; i < numberofFiles; i++) {
      const acceptedFile = acceptedFiles[i];
      const fileName = acceptedFile.name;
      const dataUrl = await readFileAsDataURL(acceptedFile);
      const newImage = {
        name: fileName,
        src: dataUrl as string,
        file: acceptedFile,
        id: Math.random().toString(36).substr(2, 9),
      };
      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  return (
    <SideMenuPanel title='Image'>
      <DropzoneFiles onMediaUpload={onMediaUpload} />
      <div className='px-1 mt-4'>
        <Swiper
          style={{
            // @ts-ignore
            '--swiper-navigation-color': 'rgb(46 16 101)',
            '--swiper-pagination-color': 'rgb(46 16 101)',
          }}
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          allowTouchMove={false}
          className='mySwiper2'
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <DraggableImage
                id={image.id}
                src={image.src}
                onAdd={handleOnAddImage}
                onRemove={handleOnRemoveImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SideMenuPanel>
  );
}

export default ImageToolPanel;
