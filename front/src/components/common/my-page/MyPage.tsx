import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function MyPage() {
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="user-info"
        size="large"
        sx={{ position: "absolute", zIndex: 1001, right: "1rem" }}
      >
        <AccountCircleIcon sx={{ fontSize: "30px" }} />
      </IconButton>
    </>
  );
}
