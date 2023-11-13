"use client";

import { usePathname } from "next/navigation";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import CameraIcon from "@mui/icons-material/Camera";
import CollectionsIcon from "@mui/icons-material/Collections";
import { theme } from "@/styles/ThemeRegistry";

interface Props {}

function BottomNav() {
  let activeNum = 0;
  let pathname = usePathname();
  switch (pathname) {
    case "/studio":
      activeNum = 0;
      break;
    case "/album":
      activeNum = 1;
      break;
  }
  return (
    <BottomNavigation
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        height: "72px",
        position: "fixed",
        bottom: 0,
        maxWidth: "480px",
        // 컬러코드 글로벌에서 가져올 것
        borderTop: "1px solid #d9d9d9",
      }}
      value={activeNum}
      showLabels
    >
      <BottomNavigationAction
        href="/studio"
        icon={<PaletteIcon />}
        label="캐주얼"
        disableRipple
      />
      <BottomNavigationAction
        href="/ai-studio"
        icon={<CameraIcon />}
        label="스튜디오"
        disableRipple
      />
      <BottomNavigationAction
        href="/album"
        icon={<CollectionsIcon />}
        label="앨범"
        disableRipple
      />
    </BottomNavigation>
  );
}

export default BottomNav;
