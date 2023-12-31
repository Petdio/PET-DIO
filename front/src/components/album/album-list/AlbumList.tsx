'use client';

import { useState, useEffect } from 'react';
// components
import { Box } from '@mui/material';
import ThemeSection from '@/components/album/theme-section/ThemeSection';
import ThemeSelectButton from '@/components/album/theme-select/theme-select-button/ThemeSelectButton';
import ThemeSelectBottomSheet from '@/components/album/theme-select/theme-select-bottom-sheet/ThemeSelectBottomSheet';
import DetailModal from '@/components/album/detail/detail-modal/DetailModal';
import NoImage from '../no-image/NoImage';
// interfaces
import { ModalInfoProps } from '@/interfaces/ModalInfoProps';
import { AlbumDataProps } from '@/interfaces/AlbumDataProps';
// apis
import getAlbumList from '@/apis/getAlbumList';
// utils
import convertTheme from '@/utils/convertTheme';
import { useRouter } from 'next/navigation';
// error
import ErrorBoundary from '@/app/ErrorBoundary';

function AlbumList() {
  // throw new Error('의도적으로 에러 발생');
  const router = useRouter();
  const [albumData, setAlbumData] = useState<AlbumDataProps[]>([]);
  let noImage = true;
  let numOfThemes = 0;
  useEffect(() => {
    async function fetchAlbumData() {
      const response = await getAlbumList(localStorage.getItem('access-token'));
      if (response !== undefined) {
        const data = response.data;
        setAlbumData(data);
        // console.log(data);
      } else {
        console.log('response undefined');
      }
    }
    fetchAlbumData();
  }, []);

  const albumTheme = albumData.map((data, idx) => {
    let imageExists = true;
    if (data.detail.length === 0) imageExists = false;
    noImage = false;
    numOfThemes++;
    const theme = Object.values(data);
    const themeEN = theme[0];
    const themeENandStatus = {
      themeName: convertTheme(themeEN),
      imageExists: imageExists,
    };
    return themeENandStatus;
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
    path: '',
  });
  const handleModalOpen = (modalInfo: ModalInfoProps) => {
    setModalInfo(modalInfo);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <ErrorBoundary>
        <Box marginTop="1rem">
          {!noImage ? (
            albumData.map((data, idx) => {
              const themeEN = Object.values(data)[0];
              const themeKO = convertTheme(themeEN);
              const path = data.path;
              // console.log(data);
              const isDisplayed =
                filteredThemeIdx === -1 || filteredThemeIdx === idx;

              return (
                <Box
                  key={data.conceptId}
                  display={isDisplayed ? 'block' : 'none'}
                >
                  {data.detail.length !== 0 && (
                    <ThemeSection
                      themeName={themeKO}
                      imgList={data.detail}
                      onClickFn={handleModalOpen}
                      againPath={path}
                    />
                  )}
                  <Box height="1rem" />
                </Box>
              );
            })
          ) : (
            <Box
              width="100%"
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <NoImage />
            </Box>
          )}
        </Box>

        <DetailModal
          isOpen={modalOpen}
          themeName={modalInfo.themeName}
          imgInfo={modalInfo}
          handleClose={handleModalClose}
          againURL={modalInfo.path as string}
        />
        <ThemeSelectButton
          disabled={numOfThemes <= 1 ? true : false}
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
      </ErrorBoundary>
    </>
  );
}

export default AlbumList;
