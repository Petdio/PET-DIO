import Image from 'next/image';
import { Typography, Box } from '@mui/material';
import { theme } from '@/styles/ThemeRegistry';

interface Props {
  imgSrc: string;
  themeName: string;
}

function ThemeCard({ imgSrc, themeName }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      borderRadius="0.5rem"
      sx={{
        cursor: 'pointer',
        ':hover': {
          backgroundColor: theme.palette.grey[50],
        },
        ':active': {
          backgroundColor: theme.palette.grey[300],
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          marginBottom: '0.25rem',
          aspectRatio: 1 / 1,
          width: '100%',
        }}
      >
        <Image
          src={imgSrc}
          alt={themeName}
          fill
          placeholder="empty"
          style={{
            borderRadius: '0.5rem',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </Box>
      <Box textAlign="center">
        <Typography
          fontSize={18}
          fontWeight={700}
        >
          {themeName}
        </Typography>
      </Box>
    </Box>
  );
}

export default ThemeCard;
