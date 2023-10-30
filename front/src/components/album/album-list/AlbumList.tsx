'use client';

import { useState } from 'react';
import axios from 'axios';
// components
import { Box } from '@mui/material';
import ThemeSection from '@/components/album/theme-section/ThemeSection';
import ThemeSelectButton from '@/components/album/theme-select/theme-select-button/ThemeSelectButton';
import ThemeSelectBottomSheet from '@/components/album/theme-select/theme-select-bottom-sheet/ThemeSelectBottomSheet';
import DetailModal from '@/components/album/detail/detail-modal/DetailModal';
// interfaces
import { ModalInfoProps } from '@/interfaces/ModalInfoProps';
import { AlbumDataProps } from '@/interfaces/AlbumDataProps';
// apis

interface Props {
  dummy: AlbumDataProps[];
}

function AlbumList({ dummy }: Props) {
  const dummyData = dummy;
  const dummyTheme = dummy.map((data) => {
    const key = Object.keys(data);
    return key[0];
  });
  const themeNames = dummyTheme;

  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilterToggle = (open: boolean) => {
    setFilterOpen(open);
  };
  const [filteredThemeIdx, setFilteredThemeIdx] = useState(-1);
  const handleFilterIdx = (idx: number) => {
    setFilteredThemeIdx(idx);
    setFilterOpen(false);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ModalInfoProps>({
    imgSrc: '',
    themeName: '',
    date: '',
  });
  const handleModalOpen = (modalInfo: ModalInfoProps) => {
    setModalOpen(true);
    setModalInfo(modalInfo);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // async function getAlbumList() {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.BASE_URL}:8080/album/list`
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error('Failed to get album list:', error);
  //   }
  // }

  return (
    <>
      {/* {getAlbumList()} */}
      <Box marginTop="1rem">
        {dummyData.map((data, idx) => {
          const themeName = Object.keys(data)[0];
          const isDisplayed =
            filteredThemeIdx === -1 || filteredThemeIdx === idx;

          return (
            <Box
              key={idx}
              display={isDisplayed ? 'block' : 'none'}
            >
              <ThemeSection
                themeName={themeName}
                imgList={data[themeName]}
                onClickFn={handleModalOpen}
              />
              <Box height="1rem" />
            </Box>
          );
        })}
      </Box>

      <DetailModal
        isOpen={modalOpen}
        themeName={modalInfo.themeName}
        imgInfo={modalInfo}
        handleClose={handleModalClose}
      />
      <ThemeSelectButton
        isFiltered={filteredThemeIdx === -1 ? false : true}
        onClick={
          filteredThemeIdx === -1
            ? () => handleFilterToggle(true)
            : () => handleFilterIdx(-1)
        }
      />
      <ThemeSelectBottomSheet
        isOpen={filterOpen}
        onOpen={() => handleFilterToggle(true)}
        onClose={() => handleFilterToggle(false)}
        themeIdx={filteredThemeIdx}
        themeNameList={themeNames}
        onThemeChange={handleFilterIdx}
      />
    </>
  );
}

export default AlbumList;
