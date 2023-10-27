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

  const onSelect = (idx: number) => {
    setAnimalSelected(true);
    setAnimalIdx(idx);
  };

  return (
    <>
      <Subtitle content="어떤 동물의 사진인가요?" />
      <AnimalSelectRadioGroup
        animalItems={["개", "고양이"]}
        onSelect={onSelect}
      />
      {animalSelected && (
        <Box sx={{ width: "100%", padding: "1rem" }}>
          <Autocomplete
            disablePortal
            id="dog-breed-selection"
            options={dogBreedList}
            renderInput={(params) => <TextField {...params} label="견종" />}
          />
          <Typography color="grey">반려견의 견종을 선택해주세요.</Typography>
        </Box>
      )}
    </>
  );
}
