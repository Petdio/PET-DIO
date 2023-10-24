"use client";
import { Typography, Box } from "@mui/material";
import { theme } from "@/styles/ThemeRegistry";

interface Props {
  content: string;
  mode?: "common" | "small";
}

function Subtitle({ content, mode = "common" }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: "10px 0 10px 0",
      }}
    >
      <Box
        sx={{
          width: "2rem",
          height: "0.25rem",
          marginRight: "1rem",
          backgroundColor: theme.palette.primary.main,
        }}
      />
      {mode === "common" ? (
        <Typography variant="body1" fontWeight="medium">
          {content}
        </Typography>
      ) : (
        <Typography variant="body2" fontWeight="medium">
          {content}
        </Typography>
      )}
    </Box>
  );
}

export default Subtitle;
