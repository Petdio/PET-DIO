import { Box } from "@mui/system";
import ButtonWithTooltip from "../button-with-tooltip/ButtonWithTooltip";

export default function AddPhotoButtons() {
  return (
    <>
      <Box
        width="100%"
        padding="1rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box style={{ flex: 1 }}>
          <ButtonWithTooltip mode="crop" disabled={true} />
        </Box>
        <Box style={{ width: "0.5rem" }}></Box>
        <Box style={{ flex: 1 }}>
          <ButtonWithTooltip mode="upload" disabled={true} />
        </Box>
      </Box>
    </>
  );
}
