import Image from 'next/image';
import { Box } from '@mui/material';

interface Props {
  imgSrc: string;
  onClick?: () => {};
}

function ImageThumbnail({ imgSrc }: Props) {
  return (
    <Box
      sx={{
        position: 'relative',
        marginBottom: '0.25rem',
        aspectRatio: 1 / 1,
        // width: '(100vw - 3rem) / 3',
        width: '10rem',
        cursor: 'pointer',
        transitionDuration: '0.25s',
        transformOrigin: 'center center',
        ':hover': {
          width: '11rem',
          // width: '(100vw - 3rem) / 3 + 1rem',
        },
      }}
    >
      <Image
        src={imgSrc}
        alt="이미지"
        fill
        objectFit="cover"
        objectPosition="center center"
        placeholder="empty"
        style={{ borderRadius: '0.5rem' }}
      />
    </Box>
  );
}

export default ImageThumbnail;
