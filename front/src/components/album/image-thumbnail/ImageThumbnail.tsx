import Image from 'next/image';
import { Box } from '@mui/material';

interface Props {
  imgSrc: string;
  idx: number;
  onClick?: () => void;
}

function ImageThumbnail({ imgSrc, idx, onClick }: Props) {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        marginBottom: '0.5rem',
        aspectRatio: 1 / 1,
        width: 'calc((100% - 3rem) / 3)',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transitionDuration: '0.25s',
        transformOrigin: 'center',
        marginRight: idx % 3 === 2 ? 0 : '0.5rem',
        ':hover': {
          zIndex: 1,
          transform: 'scale(1.1)',
          boxShadow: '1px 1px 5px',
        },
      }}
    >
      <Image
        src={imgSrc}
        alt="이미지"
        fill
        objectPosition="center center"
        placeholder="empty"
        style={{ borderRadius: '0.5rem', objectFit: 'cover' }}
      />
    </Box>
  );
}

export default ImageThumbnail;
