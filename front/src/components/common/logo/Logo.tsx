import { Typography } from '@mui/material';
import { Concert_One } from 'next/font/google';
import { theme } from '@/styles/ThemeRegistry';

const concertOne = Concert_One({ subsets: ['latin'], weight: '400' });

interface Props {
  size?: 'large' | 'small';
}

function Logo({ size = 'small', ...props }) {
  const logoName = 'PET:DIO';
  const primaryColor = theme.palette.primary.main;
  switch (size) {
    case 'small':
      return (
        <Typography
          className={concertOne.className}
          color={primaryColor}
          fontSize={16}
        >
          {logoName}
        </Typography>
      );
    case 'large':
      return (
        <Typography
          className={concertOne.className}
          color={primaryColor}
          fontSize={64}
        >
          {logoName}
        </Typography>
      );
  }
}

export default Logo;
