import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import Subtitle from "@/components/studio/subtitle/Subtitle";
import ThemeList from "@/components/studio/theme-list/ThemeList";

export default function Studio() {
  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
        }}
      >
        <Typography variant="h6" color="text" fontWeight="bold">
          사진관
        </Typography>
      </Box>
      <Subtitle content="테마를 선택해요."></Subtitle>
      <ThemeList></ThemeList>
    </>
  );
}
