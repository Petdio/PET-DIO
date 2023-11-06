'use client';

import { Box, Typography } from '@mui/material';
import ImageThumbnail from '../image-thumbnail/ImageThumbnail';
import { ModalInfoProps } from '@/interfaces/ModalInfoProps';
import { ImgInfoProps } from '@/interfaces/AlbumDataProps';

interface Props {
  themeName: string;
  imgList?: ImgInfoProps[];
  onClickFn?: (imgInfo: ModalInfoProps) => void;
  againPath: string
}

function ThemeSection({ themeName, imgList, onClickFn, againPath }: Props) {
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
          {imgList &&
            imgList.map((img, idx) => {
              const { albumId, albumURL, albumCreated } = img;
              return (
                <ImageThumbnail
                  albumId={albumId}
                  key={albumURL}
                  albumURL={albumURL}
                  albumCreated={albumCreated}
                  idx={idx}
                  onClickFn={onClickFn}
                  themeName={themeName}
                  path={againPath}
                />
              );
            })}
        </Box>
      </Box>
    </>
  );
}

export default ThemeSection;
