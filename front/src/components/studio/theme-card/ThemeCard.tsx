import Image from 'next/image';
import { Typography, Box } from '@mui/material';

interface Props {
  imgSrc: string;
  themeName: string;
  onClick?: () => {};
}

function ThemeCard({ imgSrc, themeName }: Props) {
  return (
    <div>
      <Box
        sx={{
          position: 'relative',
          marginBottom: '0.25rem',
          aspectRatio: 1 / 1,
          minWidth: 150,
          maxWidth: 200,
        }}
      >
        <Image
          src={imgSrc}
          alt={themeName}
          fill
          objectFit="cover"
          objectPosition="center center"
          placeholder="empty"
          style={{ borderRadius: '0.5rem' }}
        />
      </Box>
      <div>
        <Typography fontWeight={700}>{themeName}</Typography>
      </div>
    </div>
  );
}

export default ThemeCard;
