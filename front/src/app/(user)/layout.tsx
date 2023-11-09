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
      <Header />
      <Box
        sx={{
          height: "auto",
          width: "100%",
          paddingTop: "72px",
          paddingBottom: "64px",
          backgroundColor: "#fff",
          position: "fixed",
          maxWidth: "480px",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
      <BottomNav />
    </>
  );
}
