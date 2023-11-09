import Logo from "@/components/common/logo/Logo";
import { Typography, Box, LinearProgress } from "@mui/material";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
        <Box
          sx={{
            width: "50%",
            paddingTop: "30vh",
            justifyContent: "space-around",
          }}
        >
          <Typography
            variant="body1"
            color="black"
            sx={{ textAlign: "center", mb: "20px" }}
          >
            로그인 중...
          </Typography>
          <LinearProgress />
        </Box>
      </Box>
      {children}
    </>
  );
}
