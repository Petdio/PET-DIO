'use client';

import { useState, useEffect } from 'react';
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
import getAlbumList from '@/apis/getAlbumList';
// utils
import convertTheme from '@/utils/convertTheme';

interface Props {
  albumData: AlbumDataProps[];
}

function AlbumList() {
  const [albumData, setAlbumData] = useState<AlbumDataProps[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAlbumList(
          localStorage.getItem('access-token')
        );
        if (response !== undefined) {
          const data = response.data;
          setAlbumData(data);
        } else {
          console.log('response undefined');
        }
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    }
    fetchData();
  }, []);

  const albumTheme = albumData.map((data) => {
    const theme = Object.values(data);
    const themeEN = theme[0];
    return convertTheme(themeEN);
  });

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
    albumId: -1,
    albumURL: '',
    themeName: '',
    albumCreated: '',
  });
  const handleModalOpen = (modalInfo: ModalInfoProps) => {
    setModalOpen(true);
    setModalInfo(modalInfo);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box marginTop="1rem">
        {albumData &&
          albumData.map((data, idx) => {
            const themeEN = Object.values(data)[0];
            const themeKO = convertTheme(themeEN);
            const isDisplayed =
              filteredThemeIdx === -1 || filteredThemeIdx === idx;

            return (
              <Box
                key={data.conceptId}
                display={isDisplayed ? 'block' : 'none'}
              >
                <ThemeSection
                  themeName={themeKO}
                  imgList={data.detail}
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
        themeNameList={albumTheme}
        onThemeChange={handleFilterIdx}
      />
    </>
  );
}

export default AlbumList;
