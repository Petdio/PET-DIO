"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Box, Typography, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { theme } from "@/styles/ThemeRegistry";

function PhotoAddBox() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box padding="1rem">
      <Box
        // 기기 가로 길이에 따라 달라저야 할 것
        // width="20.5rem"
        // width: 'calc(100%-2rem)',
        width="100%"
        position="relative"
        borderRadius="0.5rem"
        sx={{
          aspectRatio: 1 / 1,
          borderRadius: "0.5rem",
          backgroundColor: theme.palette.grey[200],
          cursor: "pointer",
        }}
        onClick={handleFileUploadClick}
      >
        {!image ? (
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        ) : (
          <>
            <Image
              src={image as string}
              alt={image as string}
              fill
              objectFit="cover"
              objectPosition="center center"
              placeholder="empty"
              style={{ borderRadius: "0.5rem", cursor: "default" }}
            />
            <IconButton
              className="parentBtn"
              sx={{
                position: "absolute",
                right: "1rem",
                bottom: "1rem",
                width: "2rem",
                height: "2rem",
                "&:hover": {
                  "& .MuiSvgIcon-root": {
                    color: theme.palette.error.light,
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.25rem",
                  backgroundColor: theme.palette.grey[200],
                }}
              />
              <DeleteIcon
                sx={{
                  zIndex: 1,
                }}
              />
            </IconButton>
          </>
        )}
        {!image && (
          <Box
            display="flex"
            flexDirection="column"
            position="absolute"
            top="50%"
            left="50%"
            alignItems="center"
            sx={{ transform: "translate(-50%, -50%)" }}
            fontSize="3.5rem"
          >
            <AddCircleIcon
              fontSize="inherit"
              sx={{
                color: theme.palette.grey[400],
                marginBottom: "0.25rem",
              }}
            />
            <Typography color={theme.palette.text.secondary} fontSize="1rem">
              사진첩에서 업로드
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PhotoAddBox;
