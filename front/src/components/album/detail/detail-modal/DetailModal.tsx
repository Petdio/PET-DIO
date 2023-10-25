'use client';
import { useState, forwardRef, ReactElement, Ref } from 'react';
import Image from 'next/image';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Slide,
  styled,
  Typography,
  Tooltip,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions/transition';
import { downloadImage } from './../../../../utils/downLoadImage';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CameraIcon from '@mui/icons-material/Camera';
import CloseIcon from '@mui/icons-material/Close';

const ActionButton = styled(Button)({
  // margin: '0.25rem',
});

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

interface ImgInfoProps {
  imgSrc: string;
  themeName: string;
  date: string;
}

interface Props {
  imgInfo: ImgInfoProps;

  isOpen: boolean;
}

function DetailModal({ imgInfo, isOpen }: Props) {
  const { imgSrc, themeName, date } = imgInfo;
  const [open, setOpen] = useState(isOpen);
  const handleClose = () => {
    setOpen(false);
  };
  if (!isOpen) return null;
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      sx={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <Button
        startIcon={<CloseIcon />}
        size="small"
        // 컬러가 흠...
        color="inherit"
        disableRipple
        sx={{
          margin: '1rem 0 0 0.75rem',
          alignSelf: 'start',
          borderRadius: 100,
        }}
        onClick={handleClose}
      >
        닫기
      </Button>
      <DialogContent sx={{ overflow: 'hidden', padding: '1rem' }}>
        <DialogContentText textAlign="end">
          <Typography fontSize={14}>{themeName + ', ' + date}</Typography>
        </DialogContentText>

        <Box
          position="relative"
          width="100%"
          marginTop="0.5rem"
          sx={{ aspectRatio: 1 / 1 }}
        >
          <Image
            src={imgSrc}
            alt={themeName + ', ' + date}
            fill
            objectFit="cover"
            objectPosition="center center"
            placeholder="empty"
            style={{ borderRadius: '0.5rem' }}
          />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          padding: '0 1rem 1rem 1rem',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
          padding={0}
        >
          <Box
            display="flex"
            width="100%"
          >
            <Tooltip
              title="아직 준비중인 기능이에요."
              placement="top"
              arrow
            >
              <ActionButton
                variant="contained"
                color="secondary"
                endIcon={<ShareIcon />}
                fullWidth
              >
                공유
              </ActionButton>
            </Tooltip>
            <Box width="1em" />
            <ActionButton
              variant="contained"
              color="primary"
              endIcon={<SaveAltIcon />}
              fullWidth
              onClick={() => downloadImage(imgSrc, imgSrc)}
            >
              저장
            </ActionButton>
          </Box>
          <Box height="0.5rem" />
          <ActionButton
            variant="outlined"
            color="primary"
            endIcon={<CameraIcon />}
            fullWidth
            sx={{ width: '100%' }}
          >
            이 테마로 다시 만들기
          </ActionButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default DetailModal;
