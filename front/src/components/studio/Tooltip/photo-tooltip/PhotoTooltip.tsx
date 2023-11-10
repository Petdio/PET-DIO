'use client';
import { useState } from 'react';
import {
  Tooltip,
  IconButton,
  ClickAwayListener,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import Image from 'next/image';

export default function PhotoTooltip() {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        arrow
        disableFocusListener
        disableHoverListener
        disableTouchListener
        sx={{ padding: 0, marginLeft: '0.5rem' }}
        title={
          <>
            <Box width={300}>
              <div>AI가 잘 인식할 수 있도록,</div>
              <div>아래처럼 얼굴이 잘 나온 사진을 업로드해주세요.</div>

              <Grid
                container
                spacing={1}
                marginTop="0.5rem"
              >
                <Grid item>
                  <Image
                    src="/assets/Dog1.svg"
                    alt="Dog1"
                    width={85}
                    height={85}
                  />
                </Grid>
                <Grid item>
                  <Image
                    src="/assets/Dog2.svg"
                    alt="Dog2"
                    width={85}
                    height={85}
                  />
                </Grid>
                <Grid item>
                  <Image
                    src="/assets/Dog3.svg"
                    alt="Dog3"
                    width={85}
                    height={85}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        }
      >
        <IconButton
          onClick={handleTooltipOpen}
          size="medium"
        >
          <HelpIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ClickAwayListener>
  );
}
