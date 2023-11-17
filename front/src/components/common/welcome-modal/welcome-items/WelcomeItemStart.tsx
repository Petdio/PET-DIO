import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "@/styles/ThemeRegistry";
import { amber } from "@mui/material/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import CardGiftcardTwoToneIcon from "@mui/icons-material/CardGiftcardTwoTone";
import { member } from "@/constants/member";

export const TextBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2px 2px 2px 2px",
}));

interface Props {
  startTutorial: () => void;
}

function WelcomeItemStart({ startTutorial }: Props) {
  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CardGiftcardTwoToneIcon
        htmlColor={theme.palette.primary.main}
        sx={{ fontSize: 32 }}
      />
      <Box height="0.5rem" />
      <TextBox>
        <Typography
          color={theme.palette.primary.main}
          fontWeight={700}
        >
          PETDIO&nbsp;
        </Typography>
        <Typography>가입을 축하합니다!</Typography>
      </TextBox>
      <TextBox>
        <Typography fontSize={14}>가입 기념으로&nbsp;</Typography>
        <TollTwoToneIcon
          sx={{ fontSize: 16 }}
          htmlColor={amber[500]}
        />
        <Typography fontSize={14}>{member.initCoin}을 드렸어요.</Typography>
      </TextBox>
      <Box height="2rem" />
      {/* <Button
        variant="text"
        endIcon={<ArrowForwardIcon />}
        sx={{
          // position: 'absolute',
          // bottom: '1.5rem',
          borderRadius: 100,
        }}
        onClick={() => startTutorial()}
      >
        시작하기
      </Button> */}
      <TextBox>
        <Typography color={theme.palette.primary.main}>
          슬라이드로 시작
        </Typography>
        <ArrowForwardIcon htmlColor={theme.palette.primary.main} />
      </TextBox>
    </Box>
  );
}

export default WelcomeItemStart;
