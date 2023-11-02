import Logo from "@/components/common/logo/Logo";
import { Typography, Box } from "@mui/material";
import KakaoLogIn from "@/components/common/login/kakao-login/KakaoLogin";
import FirebaseTest from "@/components/FirebaseTest";

export default function LogIn() {
  return (
    <>
      <FirebaseTest />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            paddingTop: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Logo size="large"></Logo>
          <Typography
            variant="body2"
            color="primary"
            fontSize={20}
            fontWeight="light"
          >
            우리집 멍냥이를 위한 이색 사진관
          </Typography>
        </Box>
        <KakaoLogIn />
      </Box>
    </>
  );
}
