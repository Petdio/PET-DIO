"use client";

import { useEffect } from "react";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAlert } from "@/components/provider/AlertProvider";

export default function AlertBar() {
  const { show, isSuccessed, message, close } = useAlert();

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        close();
      }, 3000);
    }
  }, [close, show]);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "auto",
        bottom: "88px",
        left: "1rem",
        right: "1rem",
        wordWrap: "break-word",
      }}
    >
      <Collapse aria-disabled in={show}>
        <Alert
          severity={isSuccessed ? "success" : "error"}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={close}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
