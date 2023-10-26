'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ImageThumbnail from '../image-thumbnail/ImageThumbnail';
import { ModalInfoProps } from '@/interfaces/ImgInfoProps';

// ImgInfoProps가 공통으로 재사용된다면 interface로 따로 빼서 export해줄 것
interface ImgInfoProps {
  imgSrc: string;
  date: string;
}

interface Props {
  themeName: string;
  imgList: ImgInfoProps[];
  onClickFn?: (imgInfo: ModalInfoProps) => void;
}

function ThemeSection({ themeName, imgList, onClickFn }: Props) {
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
                date={date}
                idx={idx}
                onClickFn={onClickFn}
                themeName={themeName}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default ThemeSection;
