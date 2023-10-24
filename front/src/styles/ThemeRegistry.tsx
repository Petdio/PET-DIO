'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';

/** 여기서 MUI 테마를 설정하면 된다 */

const themeOptions: ThemeOptions = {
  typography: {
    fontSize: 16,
    fontFamily: 'Pretendard',
  },
  palette: {
    background: {
      default: 'dark',
    },
    primary: {
      main: '#8758FF',
      light: '#A185FF',
      dark: '#7430F7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#5CB8E4',
      light: '#8CCCED',
      dark: '#2798D0',
      contrastText: '#fff',
    },
    text: {
      primary: "#181818",
      secondary: "#18181860",
      disabled: "#18181838",
    },
    common: {
      black: '#181818',
      white: '#fff',
    },
    grey: {
      50: "#f6f6f6",
      100: "#e7e7e7",
      200: "#d1d1d1",
      300: "#E0E0E0",
      400: "#888888",
      500: "#6d6d6d",
      600: "#5d5d5d",
      700: "#4f4f4f",
      800: "#454545",
      900: "#3d3d3d",
    },
  },
};

export const theme = createTheme(themeOptions);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
