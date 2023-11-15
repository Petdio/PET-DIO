import { Typography, Box } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

function NoModel() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <PriorityHighIcon sx={{ margin: "0.5rem" }} />
      <Typography color="inherit">모델이 아직 없어요.</Typography>
      <Typography color="inherit">아래 +버튼을 눌러 만들 수 있어요.</Typography>
    </Box>
  );
}

export default NoModel;
