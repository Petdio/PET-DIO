"use client";
import { useState } from "react";
import Subtitle from "@/components/studio/subtitle/Subtitle";
import AnimalSelectRadioGroup from "@/components/studio/animal-select-radio/AnimalSelectRadioGroup";
import {
  Autocomplete,
  TextField,
  Typography,
  Box,
  Tooltip,
  ClickAwayListener,
  IconButton,
  Button,
} from "@mui/material";
import {
  dogBreedList,
  catBreedList,
} from "@/app/(user)/studio/[theme]/setting/Breeds";
import HelpIcon from "@mui/icons-material/Help";
import { useRouter } from "next/navigation";
import ButtonWithTooltip from "@/components/studio/Tooltip/button-with-tooltip/ButtonWithTooltip";

export default function Setting() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [animalSelected, setAnimalSelected] = useState(false);
  const [animalIdx, setAnimalIdx] = useState(-1);
  const [breed, setBreed] = useState<string | undefined>();
  const [inputComplete, setInputComplete] = useState(false);

  const animalType = ["개", "고양이"];
  const animalLabelSet = [
    { label: "견종", comment: "반려견의 견종을 선택해주세요." },
    { label: "묘종", comment: "반려묘의 묘종을 선택해주세요." },
  ];
  const breedList = [dogBreedList, catBreedList];

  const onSelect = (idx: number) => {
    setAnimalSelected(true);
    setAnimalIdx(idx);
  };

  const handleChange = (
    e: React.SyntheticEvent,
    value: { label: string } | null
  ): void => {
    setBreed(value?.label);
    if (value?.label) {
      // setToggle(true);
      setInputComplete(true);
    } else {
      setInputComplete(false);
    }
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const sendSetting = () => {
    router.push("generating");
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "200%",
        display: "flex",
        transform: `${toggle ? "translate(-50%,0)" : "translate(0,0)"}`,
        transition: "transform 1s ease",
        transitionDelay: "0.5s",
      }}
    >
      <Box sx={{ height: "100%", width: "50%" }}>
        <Subtitle content="반려동물은 어떤 동물인가요?" />
        <AnimalSelectRadioGroup animalItems={animalType} onSelect={onSelect} />
        {animalSelected && (
          <Box sx={{ width: "100%", padding: "1rem" }}>
            <Autocomplete
              disablePortal
              id="dog-breed-selection"
              options={breedList[animalIdx]}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={animalLabelSet[animalIdx].label}
                />
              )}
            />
            <Typography color="grey">
              {animalLabelSet[animalIdx].comment}
            </Typography>
            <Box paddingTop="1rem">
              <ButtonWithTooltip
                disabled={!inputComplete}
                toolTipContent="세부 설정 입력을 완료해주세요!"
                mode="upload"
                onClick={sendSetting}
              />
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={{ height: "100%", width: "50%" }}>
        <Subtitle content="마지막으로 세부설정을 입력해주세요." />
        <Typography variant="caption" color="grey" paddingLeft="1rem">
          예시) 오른쪽 얼굴에 점이 있어요.
        </Typography>
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
            title={
              <>
                <div>반려동물의 주요한 특징을 입력하면</div>
                <div>결과물의 퀄리티가 올라갈 수 있어요!</div>
              </>
            }
          >
            <IconButton onClick={handleTooltipOpen} size="medium">
              <HelpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
        <Box sx={{ padding: "1rem", width: "100%" }}>
          <TextField
            id="standard-basic"
            label="반려동물의 특징을 적어주세요."
            variant="standard"
            multiline
            sx={{ width: "100%" }}
          />
        </Box>
        <Box padding="1rem">
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={sendSetting}
          >
            확인
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
