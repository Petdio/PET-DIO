"use client";

import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";

// 아이콘 넣어야 함

interface Props {
  isUploadDone: boolean;
  uploadClick: () => void;
  openNameModal: () => void;
  children: React.ReactElement<any, any>;
}

function UploadCreateButton({
  isUploadDone,
  uploadClick,
  children,
  openNameModal,
}: Props) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 88,
        left: "50%",
        transform: "translate(-50%)",
        justifyContent: "center",
        width: "100%",
        maxWidth: "480px",
        padding: "0 1rem",
      }}
    >
      {isUploadDone ? (
        <Box
          display={"flex"}
          width={"100%"}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "50%" }}
            onClick={uploadClick}
          >
            다시 올리기
            {children}
          </Button>
          <Box width={"0.5rem"} />
          <Button
            variant="contained"
            sx={{ width: "50%" }}
            onClick={openNameModal}
          >
            모델 만들기
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={uploadClick}
        >
          사진 올리기
          {children}
        </Button>
      )}
    </Box>
  );
}

export default UploadCreateButton;