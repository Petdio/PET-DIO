"use client";
import { MenuItem, ListItemIcon } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/navigation";

export default function MemberSign() {
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("access-token"); // access-token 제거
    router.refresh();
    window.location.href = "/login";
  };

  const handleLogIn = () => {
    window.location.href = "/login";
  };

  return (
    <>
      {localStorage.getItem("access-token") ? (
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          로그아웃
        </MenuItem>
      ) : (
        <MenuItem onClick={handleLogIn}>
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          로그인
        </MenuItem>
      )}
    </>
  );
}

MemberSign;
