'use client';
import { Grid, Box, SwipeableDrawer, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { theme } from '@/styles/ThemeRegistry';
import { grey } from '@mui/material/colors';
import React from 'react';

interface Props {
  themeNameList: {
    themeName: string;
    imageExists: boolean;
  }[];
  isOpen: boolean;
  onOpen: React.ReactEventHandler<{}>;
  onClose: React.ReactEventHandler<{}>;
  themeIdx: number;
  onThemeChange: (idx: number) => void;
}

const Puller = styled(Box)(({ theme }) => ({
  width: '6rem',
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: '0.25rem',
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 3rem)',
}));

function ThemeSelectBottomSheet({
  themeNameList,
  isOpen,
  onOpen,
  onClose,
  themeIdx,
  onThemeChange,
}: Props) {
  const themeList = () => (
    <Grid
      container
      spacing={1}
    >
      {themeNameList.map((themeData, idx) => {
        if (!themeData.imageExists) {
          return (
            <Grid
              item
              key={themeData.themeName}
              onClick={() => onThemeChange(idx)}
              xs={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="4rem"
            >
              <Typography color={theme.palette.grey[300]}>
                {themeData.themeName}
              </Typography>
            </Grid>
          );
        }
        return (
          <Grid
            item
            key={themeData.themeName}
            onClick={() => onThemeChange(idx)}
            xs={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="4rem"
            sx={{
              cursor: 'pointer',
              '&:hover': {
                '& > .content': {
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <Typography className="content">{themeData.themeName}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      disableSwipeToOpen={false}
      swipeAreaWidth={16}
      sx={{
        '& .MuiPaper-root': {
          margin: '0 auto 0 auto',
          borderRadius: '2rem 2rem 0 0',
          maxWidth: 480,
        },
      }}
    >
      <Box
        width="100%"
        height="3rem"
      />
      <Puller />
      {themeList()}
      <Box
        width="100%"
        height="1rem"
      />
    </SwipeableDrawer>
  );
}

export default ThemeSelectBottomSheet;
