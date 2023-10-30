"use client";
import Subtitle from "@/components/studio/subtitle/Subtitle";
import AnimalSelectRadioGroup from "@/components/studio/animal-select-radio/AnimalSelectRadioGroup";
import { Autocomplete, TextField, Typography, Box } from "@mui/material";
import { dogBreedList, catBreedList } from "./Breeds";
import { useState } from "react";
import { CookieSharp } from "@mui/icons-material";

export default function Setting() {
  const [animalSelected, setAnimalSelected] = useState(false);
  const [animalIdx, setAnimalIdx] = useState(-1);

  const animalType = ["개", "고양이"];
  const animalLabelSet = [
    { label: "견종", comment: "반려견의 견종을 선택해주세요." },
    { label: "묘종", comment: "반려묘의 묘종을 선택해주세요." },
  ];

  const onSelect = (idx: number) => {
    setAnimalSelected(true);
    setAnimalIdx(idx);
  };

  return (
    <>
      <Subtitle content="어떤 동물의 사진인가요?" />
      <AnimalSelectRadioGroup animalItems={animalType} onSelect={onSelect} />
      {animalSelected && (
        <Box sx={{ width: "100%", padding: "1rem" }}>
          <Autocomplete
            disablePortal
            id="dog-breed-selection"
            options={dogBreedList}
            renderInput={(params) => (
              <TextField {...params} label={animalLabelSet[animalIdx].label} />
            )}
          />
          <Typography color="grey">
            {animalLabelSet[animalIdx].comment}
          </Typography>
        </Box>
      )}
    </>
  );
}
