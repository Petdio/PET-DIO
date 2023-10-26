"use client";
import { theme } from "@/styles/ThemeRegistry";
import { Box } from "@mui/system";

export default function Bar() {
  return (
    <>
      <Box
        sx={{
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        <Box
          sx={{
            width: "0.1rem",
            height: "80%",
            backgroundColor: theme.palette.primary.light,
          }}
        ></Box>
      </Box>
    </>
  );
}
