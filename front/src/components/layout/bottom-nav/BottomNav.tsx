"use client";
// Import necessary types from Next.js and Material-UI
import { usePathname, useRouter } from "next/navigation";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import CameraIcon from "@mui/icons-material/Camera";
import CollectionsIcon from "@mui/icons-material/Collections";
import { MouseEvent, ChangeEvent, useState, useEffect } from "react";

interface BottomNavProps {}

function BottomNav(props: BottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeNum, setActiveNum] = useState<number>(0);

  const handleNavigationChange = (event: ChangeEvent<{}>, newValue: number) => {
    switch (newValue) {
      case 0:
        router.push("/studio");
        break;
      case 1:
        router.push("/ai-studio");
        break;
      case 2:
        router.push("/album");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    // Update the active state based on the current route
    switch (pathname) {
      case "/studio":
        setActiveNum(0);
        break;
      case "/ai-studio":
        setActiveNum(1);
        break;
      case "/album":
        setActiveNum(2);
        break;
      default:
        break;
    }
  }, [usePathname()]);

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
        borderTop: "1px solid #d9d9d9",
      }}
      value={activeNum}
      onChange={handleNavigationChange}
      showLabels
    >
      <BottomNavigationAction
        label="캐주얼"
        icon={<PaletteIcon />}
      />
      <BottomNavigationAction
        label="스튜디오"
        icon={<CameraIcon />}
      />
      <BottomNavigationAction
        label="앨범"
        icon={<CollectionsIcon />}
      />
    </BottomNavigation>
  );
}

export default BottomNav;
