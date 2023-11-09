import { Box, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import { theme } from '@/styles/ThemeRegistry';
import { TextBox } from './WelcomeItem1';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PhotoIcon from '@mui/icons-material/Photo';
import PetsIcon from '@mui/icons-material/Pets';

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
        <Typography color={theme.palette.primary.main}>&nbsp;사진관</Typography>
      </TextBox>

      {/* <TextBox>
        <PetsIcon
          htmlColor={theme.palette.grey[800]}
          sx={{ fontSize: 64 }}
        />
        <Box width="0.5rem" />
        <ArrowRightAltIcon />
        <Box width="0.5rem" />
        <PhotoIcon
          htmlColor={theme.palette.grey[800]}
          sx={{ fontSize: 64 }}
        />
      </TextBox> */}
      <Box height="0.5rem" />
      <Typography fontSize={16}>우리 반려동물만의</Typography>
      <TextBox>
        <Typography
          color={theme.palette.primary.main}
          fontSize={16}
          fontWeight={700}
        >
          특별한 이미지
        </Typography>
        <Typography fontSize={16}>를 만들어 보세요.</Typography>
      </TextBox>
      <Box height="1.5rem" />
    </Box>
  );
}

export default WelcomeItem2;
