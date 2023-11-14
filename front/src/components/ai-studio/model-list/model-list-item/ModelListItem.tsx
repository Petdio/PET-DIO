import { Box, Typography } from "@mui/material";

interface Props {
  content: string;
}

function ModelListItem({ content }: Props) {
  return (
    <Box
      display="flex"
      position="relative"
      border="2px solid black"
      borderRadius="0.5rem"
      width={"100%"}
      height={"2rem"}
      textAlign="center"
      sx={{ cursor: "pointer" }}
    >
      <Box
        display="flex"
        position="absolute"
        width="1.5rem"
        height="1.5rem"
        justifyContent="center"
        alignItems="center"
        sx={{ transform: "translate(-50%, -50%)", left: "50%" }}
      ></Box>
      <Typography margin="auto">{content}</Typography>
    </Box>
  );
}

export default ModelListItem;
