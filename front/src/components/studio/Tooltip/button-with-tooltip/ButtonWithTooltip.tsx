"use client";
import { useState } from "react";
import { Tooltip, Button, ClickAwayListener, Box } from "@mui/material";

interface Props {
  title: string;
  onClick?: () => void;
}

export default function ButtonsWithTooltip({ title, onClick }: Props) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
    console.log("close");
  };

  const handleTooltipOpen = () => {
    setOpen(true);
    console.log("open");
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
        title="사진을 업로드해주세요!"
      >
        <span onClick={handleTooltipOpen}>
          <Button variant="contained" color="secondary" size="medium" disabled>
            {title}
          </Button>
        </span>
      </Tooltip>
    </ClickAwayListener>
  );
}
