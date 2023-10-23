"use client";
import { Typography, Box } from "@mui/material";
import { theme } from "@/styles/ThemeRegistry";

interface Props {
  content: string;
}

function Subtitle({ content }: Props) {
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
      <Typography variant="h6">{content}</Typography>
    </Box>
  );
}

export default Subtitle;
