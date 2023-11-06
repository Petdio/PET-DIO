'use client';

import { forwardRef, useState, useRef, ChangeEvent, useEffect } from 'react';
import NextImage from 'next/image';
import {
  Box,
  Typography,
  IconButton,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { theme } from '@/styles/ThemeRegistry';
import ButtonWithTooltip from '../Tooltip/button-with-tooltip/ButtonWithTooltip';
import { Cropper, ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { TransitionProps } from '@mui/material/transitions';
import { useRouter } from 'next/navigation';
import { useFormData } from '@/components/common/FormDataProvider';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

function PhotoAddBox() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [imageWidth, setImageWidth] = useState(1);
  const [imageHeight, setImageHeight] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const router = useRouter();
  const { formData, setFormData } = useFormData();

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFormData({ ...formData, imageFile: event.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          if (img.width && img.height) {
            setImageWidth(img.width);
            setImageHeight(img.height);
          }
        };
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /** 크롭한 데이터로 할 작업 */
  const onCrop = (croppedImgURL: string) => {
    console.log(croppedImgURL);
    setImage(croppedImgURL);
    const img = new Image();
    img.src = croppedImgURL;
    img.onload = function () {
      if (img.width && img.height) {
        setImageWidth(img.width);
        setImageHeight(img.height);
      }
    };
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
    handleClose();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteImage = () => {
    setImage(null);
    setImageHeight(1);
    setImageWidth(1);
  };

  const handleUpload = () => {
    router.push('setting');
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
            aspectRatio: imageWidth / imageHeight,
            borderRadius: '0.5rem',
            backgroundColor: theme.palette.grey[200],
            cursor: 'pointer',
          }}
          onClick={handleFileUploadClick}
        >
          {!image ? (
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          ) : (
            <>
              <NextImage
                src={image as string}
                alt="업로드 이미지"
                fill
                placeholder="empty"
                style={{
                  borderRadius: '0.5rem',
                  cursor: 'default',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                }}
              />
              <IconButton
                className="parentBtn"
                sx={{
                  position: 'absolute',
                  right: '1rem',
                  bottom: '1rem',
                  width: '2rem',
                  height: '2rem',
                  '&:hover': {
                    '& .MuiSvgIcon-root': {
                      color: theme.palette.error.light,
                    },
                  },
                }}
                onClick={deleteImage}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '0.25rem',
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
              sx={{ transform: 'translate(-50%, -50%)' }}
              fontSize="3.5rem"
            >
              <AddCircleIcon
                fontSize="inherit"
                sx={{
                  color: theme.palette.grey[400],
                  marginBottom: '0.25rem',
                }}
              />
              <Typography
                color={theme.palette.text.secondary}
                fontSize="1rem"
              >
                사진첩에서 업로드
              </Typography>
              <Typography
                color={theme.palette.text.secondary}
                fontSize="1rem"
              >
                (이미지 파일만 올려주세요!)
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
            toolTipContent="사진을 업로드해주세요!"
          />
        </Box>
        <Box style={{ width: '0.5rem' }}></Box>
        <Box style={{ flex: 1 }}>
          <ButtonWithTooltip
            mode="upload"
            disabled={!image}
            onClick={handleUpload}
            toolTipContent="사진을 업로드해주세요!"
          />
        </Box>
      </Box>
      {/* 모달 */}
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
          <Cropper
            ref={cropperRef}
            src={image as string}
            viewMode={1}
            width="auto"
            height="auto"
            background={false}
            responsive
            autoCropArea={1}
            checkOrientation={false}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0rem 1rem 3.5rem 1rem',
          }}
        >
          <Button
            sx={{ width: '50%' }}
            variant="contained"
            color="inherit"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            sx={{ width: '50%' }}
            variant="contained"
            onClick={getCropData}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PhotoAddBox;
