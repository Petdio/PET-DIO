'use client';
import { ReactElement, useState } from 'react';
import { Box, Tooltip, Button, ClickAwayListener } from '@mui/material';

interface Props {
  mode: 'crop' | 'upload';
  disabled: boolean;
  toolTipContent: string;
  addComponent?: ReactElement;
  onClick?: () => void;
}

export default function ButtonWithTooltip({
  mode,
  disabled,
  onClick,
  toolTipContent,
  addComponent,
}: Props) {
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
        title={toolTipContent}
      >
        <span onClick={disabled ? handleTooltipOpen : undefined}>
          <Button
            variant="contained"
            color={mode === 'crop' ? 'secondary' : 'primary'}
            size="large"
            disabled={disabled}
            sx={{ width: '100%' }}
            onClick={onClick}
          >
            {mode === 'crop' ? '사진 크롭' : '확인'}
            {/* @todo 이 부분 CSS 위치 완전 하드코딩이라 리팩토링 필요 */}
            {addComponent && (
              <Box
                position="absolute"
                sx={{ transform: 'translateX(4rem)' }}
              >
                {addComponent}
              </Box>
            )}
          </Button>
        </span>
      </Tooltip>
    </ClickAwayListener>
  );
}
