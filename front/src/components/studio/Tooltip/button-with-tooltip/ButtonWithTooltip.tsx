"use client";
import { useState } from "react";
import { Tooltip, Button, ClickAwayListener } from "@mui/material";

interface Props {
  mode: "crop" | "upload";
  disabled: boolean;
  onClick?: () => void;
}

export default function ButtonWithTooltip({ mode, disabled, onClick }: Props) {
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
        title="사진을 업로드해주세요!"
      >
        <span onClick={disabled ? handleTooltipOpen : undefined}>
          <Button
            variant="contained"
            color={mode === "crop" ? "secondary" : "primary"}
            size="large"
            disabled={disabled}
            sx={{ width: "100%" }}
            onClick={onClick}
          >
            {mode === "crop" ? "사진 크롭" : "확인"}
          </Button>
        </span>
      </Tooltip>
    </ClickAwayListener>
  );
}
