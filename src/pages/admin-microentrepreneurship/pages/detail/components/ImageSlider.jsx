import { forwardRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Box, ButtonBase, Typography } from '@mui/material';
import { ArrowRightIcon, ArrowLeftIcon } from '@/components/icons';
import 'swiper/css';

const ImageSlider = forwardRef(function Component({ images = [], style, initialSlide = 0 }, ref) {
  return (
    <Swiper
      spaceBetween={24}
      modules={[Navigation]}
      initialSlide={initialSlide}
      style={{ flexDirection: 'column-reverse', display: 'flex', maxWidth: '50rem' }}
      ref={ref}
    >
      <SliderNavigationButtons totalSlides={images.length} initialSlide={initialSlide} />
      {images.map((image) => (
        <SwiperSlide key={image}>
          <img
            src={image}
            style={{
              width: '100%',
              height: '8rem',
              objectFit: 'cover',
              objectPosition: '0 70%',
              borderRadius: '1rem',
              ...style,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

function SliderNavigationButtons({ totalSlides = 0, initialSlide }) {
  const swiper = useSwiper();
  const [buttonStates, setButtonStates] = useState(() => ({ isBeginning: true, isEnd: false }));
  const [activeIndex, setActiveIndex] = useState(initialSlide);

  swiper.on('slideChange', (swiper) => {
    setButtonStates({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
    setActiveIndex(swiper.activeIndex);
  });

  return (
    <Box
      sx={{
        height: '4rem',
        display: 'flex',
        justifyContent: 'space-between',
        p: '0 0.5rem',
        position: 'relative',
      }}
    >
      <Box display='flex'>
        <ButtonBase
          onClick={() => swiper.slidePrev()}
          sx={{
            display: buttonStates.isBeginning ? 'none' : 'block',
            px: '1rem',
            '& svg': {
              width: '0.75rem',
              height: '1.21456rem',
            },
          }}
        >
          <ArrowLeftIcon />
        </ButtonBase>
      </Box>
      <Box
        sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <Typography variant='body1' color={'background.paper'}>
          {activeIndex + 1}/{totalSlides}
        </Typography>
      </Box>
      <Box display='flex'>
        <ButtonBase
          onClick={() => swiper.slideNext()}
          sx={{
            display: buttonStates.isEnd ? 'none' : 'block',
            px: '1rem',
            '& svg': {
              width: '0.75rem',
              height: '1.21456rem',
            },
          }}
        >
          <ArrowRightIcon />
        </ButtonBase>
      </Box>
    </Box>
  );
}

export default ImageSlider;
