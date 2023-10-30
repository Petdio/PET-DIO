"use client";
import { useState } from "react";
import { Tooltip, Button, ClickAwayListener } from "@mui/material";

interface Props {
  mode: "crop" | "upload";
  disabled: boolean;
  toolTipContent: string;
  onClick?: () => void;
}

export default function ButtonWithTooltip({
  mode,
  disabled,
  onClick,
  toolTipContent,
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
