'use client';

import { useState } from 'react';
import { Grid } from '@mui/material';
import AnimalSelectButton from './animal-select-button/AnimalSelectButton';

interface Props {
  animalItems: string[];
}

function AnimalSelectRadioGroup({ animalItems }: Props) {
  const [selectedItem, setSelectedItem] = useState(-1);
  const handleSelect = (idx: number) => {
    setSelectedItem(idx);
  };
  return (
    <Grid
      width="100%"
      container
      columnSpacing={1}
      rowSpacing={2}
    >
      {animalItems.map((animalItem, idx) => (
        <Grid
          key={idx}
          item
          xs={6}
          onClick={() => handleSelect(idx)}
        >
          <AnimalSelectButton
            content={animalItem}
            size={selectedItem === -1 ? 'large' : 'small'}
            isSelected={selectedItem === idx ? true : false}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default AnimalSelectRadioGroup;
