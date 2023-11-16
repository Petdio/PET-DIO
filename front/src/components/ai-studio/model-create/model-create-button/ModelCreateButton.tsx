"use client";

import { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

function ModelCreateButton() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rightPosition =
    windowWidth >= 480 ? `calc((100vw - 480px) / 2 + 1rem)` : "1rem";
  const moveToCreate = () => {
    router.push("/ai-studio/model-create");
  };
  return (
    <>
      <Fab
        variant="circular"
        size="large"
        color="primary"
        onClick={() => moveToCreate()}
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
