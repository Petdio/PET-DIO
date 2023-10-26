import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        size="large"
        sx={{ position: "absolute", zIndex: 1001, left: "1rem", top: "22px" }}
      >
        <ArrowBackIcon sx={{ fontSize: "30px" }} />
      </IconButton>
    </>
  );
}
