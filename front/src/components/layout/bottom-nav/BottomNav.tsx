import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import CameraIcon from "@mui/icons-material/Camera";
import CollectionsIcon from "@mui/icons-material/Collections";

interface Props {
  activeNum: number;
  onClick?: () => {};
}

function BottomNav({ activeNum }: Props) {
  return (
    <BottomNavigation
      sx={{ width: "100%", position: "fixed", bottom: 0 }}
      value={activeNum}
      showLabels
    >
      <BottomNavigationAction icon={<CameraIcon />} label="사진관" />
      <BottomNavigationAction icon={<CollectionsIcon />} label="앨범" />
    </BottomNavigation>
  );
}

export default BottomNav;
