import { Fab, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  isFiltered: boolean;
  onClick: () => void;
  disabled: boolean;
}

function ThemeSelectButton({ isFiltered, onClick, disabled }: Props) {
  const selectThemeContent = '테마 선택';
  const cancelThemeContent = '선택 취소';
  return (
    <Fab
      disabled={disabled}
      variant="extended"
      size="medium"
      color="secondary"
      onClick={onClick}
      sx={{ position: 'absolute', bottom: 88, right: '1rem' }}
    >
      {isFiltered ? (
        <>
          <Typography>{cancelThemeContent}</Typography>
          <CloseIcon sx={{ marginLeft: 1 }} />
        </>
      ) : (
        <>
          <Typography>{selectThemeContent}</Typography>
          <FilterAltIcon sx={{ marginLeft: 1 }} />
        </>
      )}
    </Fab>
  );
}

export default ThemeSelectButton;
