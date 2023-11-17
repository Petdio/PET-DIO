"use client";

import { useState, useEffect } from "react";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

interface Props {
  isModelLimit: boolean;
}

function ModelCreateButton({ isModelLimit }: Props) {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const rightPosition =
    windowWidth >= 480 ? `calc((100vw - 480px) / 2 + 1rem)` : "1rem";

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    setShowButton(true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!showButton) {
    return <></>;
  }

  return (
    <>
      <Fab
        variant="circular"
        size="large"
        color="primary"
        disabled={isModelLimit}
        onClick={() => router.push("/ai-studio/model-create")}
        sx={{
          position: "fixed",
          bottom: 88,
          right: rightPosition,
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default ModelCreateButton;
