import { Chip } from "@mui/material";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import { amber } from "@mui/material/colors";
import { theme } from "@/styles/ThemeRegistry";

interface Props {
  price: number;
  isDisabled?: boolean;
  outside?: boolean;
}

const ColoredIcon = () => {
  return (
    <TollTwoToneIcon
      htmlColor={amber[500]}
      fontSize="small"
      sx={{ marginLeft: "0.5rem" }}
    />
  );
};

function PriceChip({ price, isDisabled = false, outside = false }: Props) {
  return !outside ? (
    <Chip
      icon={<ColoredIcon />}
      label={price.toLocaleString()}
      sx={{ color: isDisabled ? theme.palette.text.secondary : "white" }}
    />
  ) : (
    <Chip
      icon={<ColoredIcon />}
      label={!isDisabled ? price.toLocaleString() : "코인 부족"}
      sx={{
        color: theme.palette.text.secondary,
        position: "absolute",
        top: -28,
        backgroundColor: "transparent",
      }}
    />
  );
}

export default PriceChip;
