'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ThemeSection from '@/components/album/theme-section/ThemeSection';
import ThemeSelectButton from '@/components/album/theme-select/theme-select-button/ThemeSelectButton';
import ThemeSelectBottomSheet from '@/components/album/theme-select/theme-select-bottom-sheet/ThemeSelectBottomSheet';
import DetailModal from '@/components/album/detail/detail-modal/DetailModal';
import { ImgInfoProps } from '@/interfaces/ImgInfoProps';
import { ModalInfoProps } from '@/interfaces/ModalInfoProps';

interface Props {
  [themeName: string]: ImgInfoProps[];
}

const dummy: Props[] = [
  {
    우주복: [
      {
        imgSrc:
          'https://static.displate.com/857x1200/displate/2023-04-06/92cc37dd392bf0c242aa6b7f8dce98b8_db6fcf774335f5c441aeb0cc2a42f0eb.jpg',
        date: '2023-10-24',
      },
      {
        imgSrc:
          'https://static.displate.com/857x1200/displate/2023-01-30/28ab887200316bc5dcccee826afd21ed_662dd4bd513811650151cd75245e3dae.jpg',
        date: '2023-10-24',
      },
      {
        imgSrc:
          'https://static.displate.com/857x1200/displate/2023-03-23/0b87bf910d68ea8f63f1291666f0bd7e_86605742b59ddace60ad2479061e1240.jpg',
        date: '2023-10-24',
      },
      {
        imgSrc:
          'https://static.displate.com/857x1200/displate/2023-04-06/11f93ddb07ad9e1aa4e1281d77d6bcc2_423963312516d8608dbcee6a41f6b374.jpg',
        date: '2023-10-24',
      },
    ],
  },
  {
    신사: [
      {
        imgSrc:
          'https://static.displate.com/857x1200/displate/2023-03-11/87dd489d90598737082eaf8dd8ca950a_b640ff9c43ad1908ee9bf747e67fd18e.jpg',
        date: '2023-10-24',
      },
    ],
  },
  {
    사이버펑크: [
      {
        imgSrc:
          'https://static.displate.com/857x1200/displate/2023-03-06/381d8304575c98db4992e0820bcc5bc0_278e7d08f38d1b7209eb7b06ffe2bef4.jpg',
        date: '2023-10-24',
      },
      {
        imgSrc:
          'https://static.displate.com/857x1200/displate/2023-03-22/ce95b42674750329062c56faa64975d2_35023b1aa4bc996ceaea8f2c06dc911d.jpg',
        date: '2023-10-24',
      },
      {
        imgSrc:
          'https://static.displate.com/857x1200/displate/2023-06-08/9c498d3480a6c774b523013b0a53f56d_1404c565fd75dc789e94cdfb486d1cca.jpg',
        date: '2023-10-24',
      },
    ],
  },
  {
    밀리터리: [
      {
        imgSrc:
          'https://static.displate.com/857x1200/displate/2023-07-06/5be0d39cc46d329703a951d58d59e536_ca6dbac4917c06c72f629df051e7138d.jpg',
        date: '2023-10-24',
      },
    ],
  },
];

const dummyTheme = dummy.map((data) => {
  const key = Object.keys(data);
  return key[0];
});

function Album() {
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
      <Box
        sx={{
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem 0 1rem',
        }}
      >
        <Typography
          variant="h6"
          color="text"
          fontWeight="bold"
        >
          앨범
        </Typography>
      </Box>
      {/** @todo 둘을 하나로 통합할 것 */}
      {filteredThemeIdx === -1 ? (
        <Box>
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
        <Box>
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

export default Album;
