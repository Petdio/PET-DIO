import { Typography, Box } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function NoImage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <PriorityHighIcon sx={{ margin: '0.5rem' }} />
      <Typography color="inherit">아직 보여드릴 이미지가 없어요.</Typography>
      <Typography color="inherit">사진관에 만들러 가요!</Typography>
    </Box>
  );
}

export default NoImage;
