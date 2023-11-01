import { useRouter } from "next/navigation";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
  const router = useRouter();

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        size="large"
        sx={{ position: "absolute", zIndex: 1001, left: "1rem" }}
        onClick={() => router.back()}
      >
        <ArrowBackIcon sx={{ fontSize: "30px" }} />
      </IconButton>
    </>
  );
}
