import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";

interface Props {
  profile?: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function MyPage({ onClick, profile }: Props) {
  console.log(profile);
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="user-info"
        size="large"
        sx={{ position: "absolute", zIndex: 1001, right: "1rem" }}
        onClick={onClick}
      >
        {profile ? (
          <Image
            src={profile}
            alt="업로드 이미지"
            width={25}
            height={25}
            placeholder="empty"
            style={{
              borderRadius: "100%",
            }}
          />
        ) : (
          <AccountCircleIcon sx={{ fontSize: "30px" }} />
        )}
      </IconButton>
    </>
  );
}
