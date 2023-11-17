"use client";

import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./UploadCreateButton.css";

interface Props {
  isUploading: boolean;
  isUploadDone: boolean;
  isDone: boolean;
  uploadClick: () => void;
  openNameModal: () => void;
  children: React.ReactElement<any, any>;
}

function UploadCreateButton({
  isUploading,
  isUploadDone,
  isDone,
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
      {isUploadDone && !isDone ? (
        <Box
          display={"flex"}
          width={"100%"}
        >
          <LoadingButton
            variant="contained"
            color="secondary"
            sx={{ width: "50%" }}
            onClick={uploadClick}
            loading={isUploading}
          >
            다시 올리기
            {children}
          </LoadingButton>
          <Box width={"0.5rem"} />
          <LoadingButton
            variant="contained"
            sx={{ width: "50%" }}
            onClick={openNameModal}
            loading={isUploading}
          >
            모델 만들기
          </LoadingButton>
        </Box>
      ) : !isDone ? (
        <LoadingButton
          variant="contained"
          color="secondary"
          fullWidth
          onClick={uploadClick}
          loading={isUploading}
        >
          사진 올리기
          {children}
        </LoadingButton>
      ) : (
        <LoadingButton
          loading
          sx={{ width: "100%" }}
          variant="contained"
        >
          요청중...
        </LoadingButton>
      )}
    </Box>
  );
}

export default UploadCreateButton;
