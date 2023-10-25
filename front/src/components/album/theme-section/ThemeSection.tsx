'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ImageThumbnail from '../image-thumbnail/ImageThumbnail';
import DetailModal from '../detail/detail-modal/DetailModal';

// ImgInfoProps가 공통으로 재사용된다면 interface로 따로 빼서 export해줄 것
interface ImgInfoProps {
  imgSrc: string;
  date: string;
}

interface Props {
  themeName: string;
  imgList: ImgInfoProps[];
}

function ThemeSection({ themeName, imgList }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  return (
    <>
      <Box
        width="100%"
        margin="0 1rem 0 1rem"
      >
        <Typography
          fontWeight={700}
          fontSize={18}
        >
          {themeName}
        </Typography>
        <Box
          width="100%"
          marginTop="0.25rem"
          display="flex"
          flexWrap="wrap"
        >
          {imgList.map((img, idx) => {
            const { imgSrc, date } = img;
            return (
              <ImageThumbnail
                key={imgSrc}
                imgSrc={imgSrc}
                idx={idx}
                onClick={openModal}
              />
            );
          })}
        </Box>
      </Box>
      {/* <DetailModal isOpen={isModalOpen} /> */}
    </>
  );
}

export default ThemeSection;
