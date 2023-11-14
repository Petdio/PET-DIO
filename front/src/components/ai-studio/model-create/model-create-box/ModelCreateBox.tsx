import { Box } from "@mui/material";
// 더하기아이콘
import { theme } from "@/styles/ThemeRegistry";

function ModelCreateBox() {
  return (
    <Box
      bgcolor={theme.palette.grey[200]}
      width={"3rem"}
      height={"3rem"}
    ></Box>
  );
}

export default ModelCreateBox;
