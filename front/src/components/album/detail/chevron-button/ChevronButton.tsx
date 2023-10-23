import { theme } from '@/styles/ThemeRegistry';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';

interface Props {
  direction: 'left' | 'right';
  onClick?: () => {};
}

function ChevronButton({ direction, onClick }: Props) {
  let ChevronIcon =
    direction === 'left' ? (
      <ChevronLeftIcon sx={{ color: theme.palette.common.white }} />
    ) : (
      <ChevronRightIcon sx={{ color: theme.palette.common.white }} />
    );
  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="2rem"
      sx={{
        backgroundColor: theme.palette.common.black,
        opacity: 0.8,
        borderRadius: 100,
        aspectRatio: 1 / 1,
        cursor: 'pointer',
      }}
    >
      {ChevronIcon}
    </Box>
  );
}

export default ChevronButton;
