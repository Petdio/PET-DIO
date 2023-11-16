import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

function ModelCreateRequested() {
  return (
    <>
      <Typography
        variant="body1"
        color="black"
        sx={{ textAlign: "center", mb: "20px" }}
      >
        이미지 생성 완료!
      </Typography>
      <CheckIcon
        color="primary"
        sx={{ width: "100%" }}
      />
    </>
  );
}

export default ModelCreateRequested;
