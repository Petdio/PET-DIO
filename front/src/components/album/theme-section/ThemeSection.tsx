import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface ImgInfoProps {
  imgSrc: string;
  themeName: string;
  date: string;
}

interface Props {
  themeName: string;
  imgList: ImgInfoProps[];
}

function ThemeSection({ themeName, imgList }: Props) {
  return (
    <Box width="100%">
      <Typography
        fontWeight={700}
        fontSize={18}
      >
        {themeName}
      </Typography>
      <Box
        width="360px"
        height="10rem"
        marginTop="0.5rem"
        display="flex"
        flexWrap="wrap"
      >
        {imgList.map((img, idx) => {
          const { imgSrc, themeName, date } = img;
          return (
            <Box
              position="relative"
              key={imgSrc}
              width="calc((100% - 1rem) / 3)"
              marginRight={idx % 3 === 2 ? 0 : '0.5rem'}
              marginBottom="0.5rem"
              sx={{ aspectRatio: 1 / 1 }}
            >
              <Image
                src={imgSrc}
                alt={themeName + ', ' + date}
                fill
                objectFit="cover"
                objectPosition="center center"
                placeholder="empty"
                style={{ borderRadius: '0.5rem' }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default ThemeSection;
