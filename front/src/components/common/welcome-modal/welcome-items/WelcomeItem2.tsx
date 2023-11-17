import { Box, Typography } from "@mui/material";
import CameraIcon from "@mui/icons-material/Camera";
import { theme } from "@/styles/ThemeRegistry";
import { TextBox } from "./WelcomeItemStart";

function WelcomeItem2() {
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
        <CameraIcon htmlColor={theme.palette.primary.main} />
        <Typography color={theme.palette.primary.main}>
          &nbsp;스튜디오
        </Typography>
      </TextBox>
      <Box height="0.5rem" />
      <TextBox>
        <Typography fontSize={16}>우리집 반려동물 전용&nbsp;</Typography>
        <Typography
          color={theme.palette.primary.main}
          fontSize={16}
          fontWeight={700}
        >
          AI모델 학습
        </Typography>
        <Typography fontSize={16}>으로</Typography>
      </TextBox>
      <TextBox>
        <Typography
          color={theme.palette.primary.main}
          fontSize={16}
          fontWeight={700}
        >
          더 정교한 이미지
        </Typography>
        <Typography fontSize={16}>를 만들어 보세요.</Typography>
      </TextBox>
      <Box height="1.5rem" />
    </Box>
  );
}

export default WelcomeItem2;
