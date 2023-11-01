"use client";
import { useState, useEffect } from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/navigation";

export default function Generating() {
  const router = useRouter();
  const [showComponent1, setShowComponent1] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowComponent1(false);
    }, 3000);

    const timer2 = setTimeout(() => {
      router.push("result");
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

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
        {showComponent1 ? (
          <>
            <Typography
              variant="body1"
              color="black"
              sx={{ textAlign: "center", mb: "20px" }}
            >
              댕댕이 옷 입히는 중...
            </Typography>
            <LinearProgress />
          </>
        ) : (
          <>
            <Typography
              variant="body1"
              color="black"
              sx={{ textAlign: "center", mb: "20px" }}
            >
              이미지 생성 완료!
            </Typography>
            <CheckIcon color="primary" sx={{ width: "100%" }} />
          </>
        )}
      </Box>
    </Box>
  );
}
