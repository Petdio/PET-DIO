"use client";
import { Typography, Box } from "@mui/material";
import { theme } from "@/styles/ThemeRegistry";

interface Props {
  content: string;
  mode?: "page" | "modal";
}

function Subtitle({ content, mode = "page" }: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box
        sx={{
          width: "2rem",
          height: "0.25rem",
          marginRight: "1rem",
          backgroundColor: theme.palette.primary.main,
        }}
      />
      {mode === "page" ? (
        <Typography variant="h6">{content}</Typography>
      ) : (
        <Typography variant="body2">{content}</Typography>
      )}
    </Box>
  );
}

export default Subtitle;
