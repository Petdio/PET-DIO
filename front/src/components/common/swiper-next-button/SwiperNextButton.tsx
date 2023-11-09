import { Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  direction: 'right' | 'left';
  onSlideDir: () => void;
}

function SwiperNextButton({ direction, onSlideDir }: Props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="fit-content"
      zIndex={1}
      sx={{ cursor: 'pointer' }}
    >
      {direction === 'right' ? (
        <ChevronRightIcon onClick={onSlideDir} />
      ) : (
        <ChevronLeftIcon onClick={onSlideDir} />
      )}
    </Box>
  );
}

export default SwiperNextButton;
