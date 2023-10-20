'use client';

import Image from 'next/image';
import { Box, Typography, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { theme } from '@/styles/ThemeRegistry';

interface Props {
  imgSrc: string;
  onClick?: () => {};
}

function PhotoAddBox({ imgSrc, onClick }: Props) {
  return (
    <Box
      // 기기 가로 길이에 따라 달라저야 할 것
      width="20.5rem"
      // width: 'calc(100%-2rem)',
      position="relative"
      borderRadius="0.5rem"
      sx={{
        aspectRatio: 1 / 1,
        borderRadius: '0.5rem',
        backgroundColor: theme.palette.grey[200],
        cursor: 'pointer',
      }}
    >
      {!imgSrc ? (
        <>
          <Box
            display="flex"
            flexDirection="column"
            position="absolute"
            top="50%"
            left="50%"
            alignItems="center"
            sx={{ transform: 'translate(-50%, -50%)' }}
            fontSize="3.5rem"
          >
            <AddCircleIcon
              fontSize="inherit"
              sx={{
                color: theme.palette.grey[400],
                marginBottom: '0.25rem',
              }}
            />
            <Typography
              color={theme.palette.text.secondary}
              fontSize="1rem"
            >
              사진첩에서 업로드
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Image
            src={imgSrc}
            alt={imgSrc}
            fill
            objectFit="cover"
            objectPosition="center center"
            placeholder="empty"
            style={{ borderRadius: '0.5rem', cursor: 'default' }}
          />
          <IconButton
            className="parentBtn"
            sx={{
              position: 'absolute',
              right: '1rem',
              bottom: '1rem',
              width: '2rem',
              height: '2rem',
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  color: theme.palette.error.light,
                },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '0.25rem',
                backgroundColor: theme.palette.grey[200],
              }}
            />
            <DeleteIcon
              sx={{
                zIndex: 1,
              }}
            />
          </IconButton>
        </>
      )}
    </Box>
  );
}

export default PhotoAddBox;
