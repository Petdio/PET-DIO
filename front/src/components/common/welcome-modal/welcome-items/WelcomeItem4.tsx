import { Box, Typography, Button } from '@mui/material';

interface Props {
  onClose: () => void;
}

function WelcomeItem4({ onClose }: Props) {
  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Typography>사진 만들러 가요</Typography>
      <Button
        variant="text"
        // endIcon={<ArrowForwardIcon />}
        sx={{
          // position: 'absolute',
          // bottom: '1.5rem',
          borderRadius: 100,
        }}
        onClick={() => onClose()}
      >
        PETDIO 시작!
      </Button>
    </Box>
  );
}

export default WelcomeItem4;
