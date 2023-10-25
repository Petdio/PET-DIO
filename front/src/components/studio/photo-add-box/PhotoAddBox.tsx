"use client";

import { forwardRef, useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  IconButton,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { theme } from "@/styles/ThemeRegistry";
import ButtonWithTooltip from "../Tooltip/button-with-tooltip/ButtonWithTooltip";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { TransitionProps } from "@mui/material/transitions";

interface Props {
  onCrop: (image: string) => void;
  aspectRatio: number;
  children: React.ReactNode;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PhotoAddBox({ onCrop, aspectRatio, children }: Props) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

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

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
      {/* 버튼*/}
      <Box
        width="100%"
        padding="1rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box style={{ flex: 1 }}>
          <ButtonWithTooltip
            mode="crop"
            disabled={!image}
            onClick={handleClickOpen}
          />
        </Box>
        <Box style={{ width: "0.5rem" }}></Box>
        <Box style={{ flex: 1 }}>
          <ButtonWithTooltip mode="upload" disabled={!image} />
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="crop-uploaded-image"
        maxWidth="xs"
      >
        <DialogTitle textAlign="center">사진 크롭</DialogTitle>
        <DialogContent>
          <div>
            <Cropper
              ref={cropperRef}
              aspectRatio={1 / 1}
              src={image as string}
              viewMode={1}
              width={800}
              height={500}
              background={false}
              responsive
              autoCropArea={1}
              checkOrientation={false}
              guides
            />
            <div>
              <button onClick={() => setImage(null)}>취소</button>
              <button onClick={getCropData}>적용하기</button>
            </div>
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0rem 1rem 3.5rem 1rem",
          }}
        >
          <Button
            sx={{ width: "50%" }}
            variant="contained"
            color="inherit"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            sx={{ width: "50%" }}
            variant="contained"
            onClick={handleClose}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PhotoAddBox;
