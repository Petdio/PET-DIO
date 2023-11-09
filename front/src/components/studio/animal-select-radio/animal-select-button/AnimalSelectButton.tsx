import { Box, Typography } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { theme } from '@/styles/ThemeRegistry';

interface Props {
  content: string;
  size: 'large' | 'small';
  isSelected: boolean;
}

function AnimalSelectButton({ content, size, isSelected }: Props) {
  const unSelectedColor = theme.palette.grey[400];
  const white = theme.palette.common.white;
  const black = theme.palette.common.black;
  const primary = theme.palette.primary.main;
  let btnHeight = 0;
  switch (size) {
    case 'large':
      btnHeight = 160;
      break;
    case 'small':
      btnHeight = 80;
      break;
  }
  return (
    <Box
      display="flex"
      position="relative"
      bgcolor={white}
      border="2px solid black"
      borderColor={isSelected ? primary : unSelectedColor}
      borderRadius="0.5rem"
      // width="10rem"
      width={'100%'}
      height={btnHeight}
      textAlign="center"
      sx={{ cursor: 'pointer', transitionDuration: '0.4s' }}
    >
      <Box
        display="flex"
        position="absolute"
        width="1.5rem"
        height="1.5rem"
        justifyContent="center"
        alignItems="center"
        bgcolor={white}
        sx={{ transform: 'translate(-50%, -50%)', left: '50%' }}
      >
        {isSelected ? (
          <RadioButtonCheckedIcon
            fontSize="small"
            sx={{ color: primary }}
          />
        ) : (
          <RadioButtonUncheckedIcon
            fontSize="small"
            sx={{ color: unSelectedColor }}
          />
        )}
      </Box>
      <Typography
        color={isSelected ? black : unSelectedColor}
        margin="auto"
      >
        {content}
      </Typography>
    </Box>
  );
}

export default AnimalSelectButton;
