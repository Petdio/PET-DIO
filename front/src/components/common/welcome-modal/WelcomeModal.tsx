'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, Box, Typography, Button } from '@mui/material';
import { SlideMUI } from '@/components/animation/SlideMUI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import WelcomeItem1 from './welcome-items/WelcomeItem1';
import WelcomeItem2 from './welcome-items/WelcomeItem2';
import WelcomeItem3 from './welcome-items/WelcomeItem3';
import WelcomeItem4 from './welcome-items/WelcomeItem4';
import { SwiperClass } from 'swiper/react';
import SwiperNextButton from '../swiper-next-button/SwiperNextButton';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { theme } from '@/styles/ThemeRegistry';

function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [isInit, setIsInit] = useState(true);
  const swiperRef = useRef<SwiperClass>();

  useEffect(() => {
    const newMemBool = localStorage.getItem('new-member');
    if (newMemBool === 'true') setOpen(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem('new-member', 'false');
    setOpen(false);
  };

  const startTutorialFn = () => {
    setIsInit(false);
    console.log(isInit);
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    // @todo 백그라운드 눌러도 안 닫히게 하고 싶음.
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={open}
      TransitionComponent={SlideMUI}
      onClose={handleClose}
      sx={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <Button
        variant="text"
        color="inherit"
        sx={{
          alignSelf: 'end',
          borderRadius: 100,
          color: theme.palette.grey[400],
          top: '0.5rem',
          right: '1rem',
        }}
        onClick={handleClose}
      >
        건너뛰기
      </Button>
      <Swiper
        className="welcome-swiper"
        navigation
        // pagination={!isInit}
        pagination={true}
        modules={[Pagination, Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>
          <WelcomeItem1 startTutorial={startTutorialFn} />
        </SwiperSlide>
        <SwiperSlide>
          <WelcomeItem2 />
        </SwiperSlide>
        <SwiperSlide>
          <WelcomeItem3 />
        </SwiperSlide>
        <SwiperSlide>
          <WelcomeItem4 onClose={handleClose} />
        </SwiperSlide>
      </Swiper>
      {/* <SwiperNextButton
        direction="left"
        onSlideDir={() => {
          if (swiperRef.current) swiperRef.current.slidePrev();
        }}
      />
      <SwiperNextButton
        direction="right"
        onSlideDir={() => {
          if (swiperRef.current) swiperRef.current.slideNext();
        }}
      /> */}
    </Dialog>
  );
}

export default WelcomeModal;
