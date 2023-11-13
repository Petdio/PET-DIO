"use client";
import { useEffect, useState } from "react";
import { Fab, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  isFiltered: boolean;
  onClick: () => void;
  disabled: boolean;
}

function ThemeSelectButton({ isFiltered, onClick, disabled }: Props) {
  const selectThemeContent = "테마 선택";
  const cancelThemeContent = "선택 취소";

  const [showFab, setShowFab] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const rightPosition =
    windowWidth >= 480 ? `calc((100vw - 480px) / 2 + 1rem)` : "1rem";

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 초기 사이즈 설정
    handleResize();

    // 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    setShowFab(true);

    // 언마운트 시에 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  if (!showFab) {
    return <></>;
  }

  return (
    <Fab
      disabled={disabled}
      variant="extended"
      size="medium"
      color="secondary"
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 88,
        right: rightPosition,
        // typeof window !== "undefined" && window.innerWidth >= 480
        //   ? `calc((100vw - 480px) / 2 + 1rem)`
        //   : "1rem",
        // window.innerWidth >= 480
        //   ? `calc((100vw - 480px) / 2 + 1rem)`
        //   : "1rem",
        // "1rem",
      }}
    >
      {isFiltered ? (
        <>
          <Typography>{cancelThemeContent}</Typography>
          <CloseIcon sx={{ marginLeft: 1 }} />
        </>
      ) : (
        <>
          <Typography>{selectThemeContent}</Typography>
          <FilterAltIcon sx={{ marginLeft: 1 }} />
        </>
      )}
    </Fab>
  );
}

export default ThemeSelectButton;
