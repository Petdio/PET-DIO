import Header from "@/components/layout/header/Header";
import { Box } from "@mui/material";
import BottomNav from "@/components/layout/bottom-nav/BottomNav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header></Header>
      <Box
        sx={{
          height: "100vh",
          paddingTop: "72px",
          paddingBottom: "64px",
        }}
      >
        {children}
      </Box>
      <BottomNav activeNum={0}></BottomNav>
    </>
  );
}
