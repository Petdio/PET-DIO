import { useState, Fragment } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { theme } from "@/styles/ThemeRegistry";
import AnimalSelectRadioGroup from "@/components/studio/animal-select-radio/AnimalSelectRadioGroup";

import { SlideMUI } from "@/components/animation/SlideMUI";

interface Props {
  open: boolean;
  handleClose: () => void;
  setName: (inputName: string) => void;
  setBreed: (inputNumber: number) => void;
  sendModelSetting: () => void;
  animalItems: string[];
}

export default function ModelCreateNameModal({
  open,
  handleClose,
  setName,
  setBreed,
  sendModelSetting,
  animalItems,
}: Props) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateClick = () => {
    sendModelSetting();
    handleClose();
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        TransitionComponent={SlideMUI}
      >
        <DialogTitle>모델 정보 설정</DialogTitle>
        <DialogContent>
          <AnimalSelectRadioGroup
            animalItems={animalItems}
            onSelect={setBreed}
            onlySmall={true}
          />
          <DialogContentText>
            한 번 결정한 이름은 변경할 수 없으니, 신중하게 지어주세요. (ex.
            반려동물 이름)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="모델 이름 (최대 n자)"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: theme.palette.grey[400] }} onClick={handleClose}>
            취소
          </Button>
          <Button onClick={handleCreateClick}>만들기</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
