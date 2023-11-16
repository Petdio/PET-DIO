import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  onClose: () => void;
}

function WelcomeItemLast({ onClose }: Props) {
  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Image
        src="/assets/vari.svg"
        alt="logo"
        width={48}
        height={48}
      />
      <Box height="0.5rem" />
      <Typography>이제 우리 반려동물의</Typography>
      <Typography>새로운 모습을 만나러 가요!</Typography>
      <Box height="1.5rem" />

      <Button
        variant="outlined"
        onClick={() => onClose()}
      >
        PETDIO 시작!
      </Button>
      <Box height="1rem" />
    </Box>
  );
}

export default WelcomeItemLast;
