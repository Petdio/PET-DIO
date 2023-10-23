import { Fab, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '@/styles/ThemeRegistry';

interface Props {
  isSelected: boolean;
}

function ThemeSelectButton({ isSelected }: Props) {
  const selectThemeContent = '테마 선택';
  const cancelThemeContent = '선택 취소';
  return (
    <Fab
      variant="extended"
      size="medium"
      color="secondary"
    >
      {isSelected ? (
        <>
          <Typography>{selectThemeContent}</Typography>
          <FilterAltIcon sx={{ marginLeft: 1 }} />
        </>
      ) : (
        <>
          <Typography>{cancelThemeContent}</Typography>
          <CloseIcon sx={{ marginLeft: 1 }} />
        </>
      )}
    </Fab>
  );
}

export default ThemeSelectButton;
