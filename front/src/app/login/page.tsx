import Logo from "@/components/common/logo/Logo";
import TestButton from "@/components/TestButton";
import { Typography } from "@mui/material";

export default function LogIn() {
  return (
    <>
      <Logo size="large"></Logo>
      <Typography variant="h6">우리집 멍냥이를 위한 이색 사진관</Typography>
      <TestButton></TestButton>
    </>
  );
}
