import { Box, Typography } from "@mui/material";
import { theme } from "@/styles/ThemeRegistry";
import { TextBox } from "./WelcomeItemStart";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

function WelcomeItem3() {
  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <TextBox>
        <PhotoLibraryIcon htmlColor={theme.palette.primary.main} />
        <Typography color={theme.palette.primary.main}>&nbsp;앨범</Typography>
      </TextBox>
      <Box height="0.5rem" />
      <Typography fontSize={16}>
        만든 이미지들을 한눈에 확인해 보세요.
      </Typography>
      <TextBox>
        <Typography
          color={theme.palette.primary.main}
          fontSize={16}
          fontWeight={700}
        >
          저장
        </Typography>
        <Typography fontSize={16}>하거나&nbsp;</Typography>
        <Typography
          color={theme.palette.primary.main}
          fontSize={16}
          fontWeight={700}
        >
          공유
        </Typography>
        <Typography fontSize={16}>할 수도 있어요.</Typography>
      </TextBox>
      <Box height="1.5rem" />
    </Box>
  );
}

export default WelcomeItem3;
