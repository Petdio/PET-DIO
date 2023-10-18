"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

/** 여기서 MUI 테마를 설정하면 된다 */

const themeOptions: ThemeOptions = {
  typography: {
    fontSize: 16,
    fontFamily: "Pretendard",
  },
  palette: {
    background: {
      default: "dark",
    },
    primary: {
      main: "#8758FF",
      light: "#A185FF",
      dark: "#7430F7",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5CB8E4",
      light: "#8CCCED",
      dark: "#2798D0",
      contrastText: "#fff",
    },
    text: {
      primary: "#18181887",
      secondary: "#18181860",
      disabled: "#18181838",
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
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
