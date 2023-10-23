import { LinearProgress, Box, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "70%",
          justifyContent: "space-around",
        }}
      >
        <Typography
          variant="body1"
          color="black"
          sx={{ textAlign: "center", mb: "20px" }}
        >
          댕댕이 옷 입히는 중...
        </Typography>
        <LinearProgress />
      </Box>
    </Box>
  );
}
