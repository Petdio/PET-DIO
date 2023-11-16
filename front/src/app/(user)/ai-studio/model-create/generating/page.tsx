"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function ModelGenerating() {
  const router = useRouter();
  useEffect(() => {
    const timeoutMove = setTimeout(() => {
      router.push("/ai-studio");
    }, 4000);
  }, []);
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <CheckIcon color="primary" sx={{ width: "100%" }} />
        <Typography
          variant="body1"
          color="black"
          sx={{ textAlign: "center", mb: "20px" }}
        >
          모델 생성 요청 완료!
        </Typography>
        <Typography
          variant="caption"
          color="black"
          sx={{ textAlign: "center" }}
        >
          완성까지 3분 정도 걸려요.
        </Typography>
        <Typography
          variant="caption"
          color="black"
          sx={{ textAlign: "center", mb: "20px" }}
        >
          준비되면 알려 드릴게요.
        </Typography>
      </Box>
    </>
  );
}
