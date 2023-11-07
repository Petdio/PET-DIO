import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
  startTutorial: () => void;
}

function WelcomeItem1({ startTutorial }: Props) {
  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography>환영해요환영해요</Typography>
      <Button
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
      </Button>
    </Box>
  );
}

export default WelcomeItem1;
