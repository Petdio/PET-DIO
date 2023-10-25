import { Typography } from "@mui/material";

import Subtitle from '@/components/studio/subtitle/Subtitle';
import ThemeList from '@/components/studio/theme-list/ThemeList';

export default function Studio() {
  return (
    <>
      <Typography variant="h6" color="text" fontWeight="bold" padding="1rem">
        사진관
      </Typography>
      <Subtitle content="테마를 선택해요."></Subtitle>
      <ThemeList></ThemeList>
    </>
  );
}
