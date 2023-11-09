import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function HomeButton() {
  const router = useRouter();

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        size="large"
        sx={{ position: "absolute", zIndex: 1001, left: "1rem" }}
        onClick={() => router.push("/studio")}
      >
        <HomeIcon sx={{ fontSize: "30px" }} />
      </IconButton>
    </>
  );
}
