import {
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TollTwoToneIcon from "@mui/icons-material/TollTwoTone";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { amber } from "@mui/material/colors";

interface Props {
  isOpen: boolean;
  closeFn: () => void;
  anchorEl: null | HTMLElement;
  coins: number;
}

function MemberMenu({ isOpen, closeFn, anchorEl, coins }: Props) {
  const handleLogOut = () => {
    localStorage.removeItem("access-token"); // access-token 제거
    window.location.href = "/";
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={closeFn}
      // onClick={closeFn}
      sx={{ transform: "translate(-0.5rem)" }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        sx={{
          cursor: "default",
          ":hover": {
            backgroundColor: "inherit",
          },
          ":active": { backgroundColor: "inherit" },
        }}
      >
        <Typography fontSize={12} color="text.primary">
          보유 코인
        </Typography>
        <Box display="flex" width="7rem" justifyContent="flex-end">
          <Typography>{coins.toLocaleString()}</Typography>
          <Box width="0.25rem" />
          <TollTwoToneIcon htmlColor={amber[500]} />
        </Box>
      </MenuItem>
      <MenuItem onClick={closeFn} disabled>
        <ListItemIcon>
          <ShoppingCartIcon fontSize="small" />
        </ListItemIcon>
        코인 충전
      </MenuItem>

      <Divider />

      <MenuItem onClick={closeFn} disabled>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        설정
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
        <ListItemIcon>
          <Logout
            fontSize="small"
            // htmlColor={red[300]}
          />
        </ListItemIcon>
        로그아웃
      </MenuItem>
    </Menu>
  );
}

export default MemberMenu;
