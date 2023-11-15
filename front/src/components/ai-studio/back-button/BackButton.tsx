"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  goPrev: () => void;
}

export default function BackButton({ goPrev }: Props) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 초기 사이즈 설정
    handleResize();

    // 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 언마운트 시에 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  const leftPosition =
    windowWidth >= 480 ? `calc((100vw - 480px) / 2 + 1rem)` : "1rem";
  const router = useRouter();

  return (
    <Box
      color={"#757575"}
      sx={{ zIndex: 30000 }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        size="large"
        sx={{ position: "fixed", zIndex: 22000, left: leftPosition, top: 50 }}
        onClick={() => goPrev()}
      >
        <ArrowBackIcon sx={{ fontSize: "30px" }} />
      </IconButton>
    </Box>
  );
}
