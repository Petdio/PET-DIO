"use client";

import { useState } from "react";
import { Grid } from "@mui/material";
import AnimalSelectButton from "./animal-select-button/AnimalSelectButton";

interface Props {
  animalItems: string[];
  onSelect: (idx: number) => void;
  onlySmall?: boolean;
}

function AnimalSelectRadioGroup({
  animalItems,
  onSelect,
  onlySmall = false,
}: Props) {
  const [selectedItem, setSelectedItem] = useState(-1);
  const handleSelect = (idx: number) => {
    setSelectedItem(idx);
    onSelect(idx);
  };
  return (
    <Grid
      width="100%"
      container
      padding="1rem"
      justifyContent="space-between"
    >
      {animalItems.map((animalItem, idx) => (
        <Grid
          key={idx}
          item
          xs={5.8}
          onClick={() => handleSelect(idx)}
        >
          <AnimalSelectButton
            content={animalItem}
            size={selectedItem === -1 && !onlySmall ? "large" : "small"}
            isSelected={selectedItem === idx ? true : false}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default AnimalSelectRadioGroup;
