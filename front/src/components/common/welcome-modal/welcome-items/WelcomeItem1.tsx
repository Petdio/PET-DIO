import { Box, Typography } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import { theme } from "@/styles/ThemeRegistry";
import { TextBox } from "./WelcomeItemStart";

function WelcomeItem1() {
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
        <PaletteIcon htmlColor={theme.palette.primary.main} />
        <Typography color={theme.palette.primary.main}>&nbsp;캐주얼</Typography>
      </TextBox>
      <Box height="0.5rem" />
      <TextBox>
        <Typography fontSize={16}>반려동물의&nbsp;</Typography>
        <Typography
          color={theme.palette.primary.main}
          fontSize={16}
          fontWeight={700}
        >
          특별한 이미지
        </Typography>
        <Typography fontSize={16}>를</Typography>
      </TextBox>
      <Typography fontSize={16}>간편하게 만들어 보세요.</Typography>
      <Box height="1.5rem" />
    </Box>
  );
}

export default WelcomeItem1;
