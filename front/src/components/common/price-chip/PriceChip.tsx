import { Chip } from '@mui/material';
import TollTwoToneIcon from '@mui/icons-material/TollTwoTone';
import { amber } from '@mui/material/colors';
import { theme } from '@/styles/ThemeRegistry';

interface Props {
  price: number;
  isDisabled?: boolean;
}

const ColoredIcon = () => {
  return (
    <TollTwoToneIcon
      htmlColor={amber[500]}
      fontSize="small"
      sx={{ marginLeft: '0.5rem' }}
    />
  );
};

function PriceChip({ price, isDisabled = false }: Props) {
  return (
    <Chip
      icon={<ColoredIcon />}
      label={price.toLocaleString()}
      sx={{ color: isDisabled ? theme.palette.text.secondary : 'white' }}
    />
  );
}

export default PriceChip;
