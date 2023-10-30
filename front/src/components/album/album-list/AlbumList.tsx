'use client';

import { useState } from 'react';
// components
import { Box } from '@mui/material';
import ThemeSection from '@/components/album/theme-section/ThemeSection';
import ThemeSelectButton from '@/components/album/theme-select/theme-select-button/ThemeSelectButton';
import ThemeSelectBottomSheet from '@/components/album/theme-select/theme-select-bottom-sheet/ThemeSelectBottomSheet';
import DetailModal from '@/components/album/detail/detail-modal/DetailModal';
import PageTitle from '@/components/common/page-title/PageTitle';
// interfaces
import { ModalInfoProps } from '@/interfaces/ModalInfoProps';
import { AlbumDataProps } from '@/interfaces/AlbumDataProps';
// apis

interface Props {
  dummy: AlbumDataProps[];
}

function AlbumList({ dummy }: Props) {
  const dummyTheme = dummy.map((data) => {
    const key = Object.keys(data);
    return key[0];
  });
  const dummyData = dummy;
  const themeNames = dummyTheme;
  const [filterOpen, setFilterOpen] = useState(false);
  const handleFilterToggle = (open: boolean) => {
    setFilterOpen(open);
  };

  const [filteredThemeIdx, setFilteredThemeIdx] = useState(-1);
  const handleFilterIdx = (idx: number) => {
    setFilteredThemeIdx(idx);
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

  return (
    <>
      {/** @todo 둘을 하나로 통합할 것 */}
      {filteredThemeIdx === -1 ? (
        <Box marginTop="1rem">
          {dummyData.map((data, idx) => {
            const themeName = Object.keys(data)[0];
            return (
              <Box
                key={idx}
                display="block"
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
      ) : (
        <Box marginTop="1rem">
          {dummyData.map((data, idx) => {
            const themeName = Object.keys(data)[0];
            return (
              <Box
                key={idx}
                display={idx === filteredThemeIdx ? 'block' : 'none'}
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
      )}
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
