import { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ButtonBase, styled } from '@mui/material';
import { ArrowRightIcon, ArrowLeftIcon } from '@/components/icons';
import 'swiper/css';
import 'swiper/css/pagination';

const StyledSwiper = styled(Swiper)(() => ({
  '.swiper-pagination': {
    position: 'relative',
    marginTop: '0.38rem',
  },

  '.swiper-pagination-bullet-active': {
    backgroundColor: '#090909',
  },

  '.swiper-pagination-bullet': {
    width: '0.44rem',
    height: '0.44rem',
  },
}));

/**
 * @param {object} props Component props
 * @param {[string]} props.images Images urls.
 * @param {import('react').CSSProperties} [props.style] Css styles for images.
 * @param {boolean} [props.autoplay] Activate automatic image scrolling.
 * @param {number} [props.delay] Delay between transitions (in ms).
 * @param {boolean} [props.stopOnLastSlide] Enable this parameter and autoplay will be stopped when it reaches last slide.
 * @returns {JSX.ReactElement} CardImageSlider component.
 **/

export default function CardImageSlider({
  images = [],
  style,
  autoplay = false,
  delay = 5000,
  stopOnLastSlide = false,
}) {
  return (
    <StyledSwiper
      spaceBetween={24}
      pagination={{
        clickable: true,
      }}
      autoplay={
        autoplay && {
          delay,
          stopOnLastSlide,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }
      }
      modules={[Pagination, Autoplay, Navigation]}
    >
      {images?.map((image, index) => (
        <SwiperSlide key={(image, index)}>
          <img
            src={image.url || image}
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
      <SliderNavigationButtons />
    </StyledSwiper>
  );
}

function SliderNavigationButtons() {
  const swiper = useSwiper();
  const [buttonStates, setButtonStates] = useState(() => ({ isBeginning: true, isEnd: false }));

  swiper.on('slideChange', (swiper) => {
    setButtonStates({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  });

  return (
    <>
      <ButtonBase
        onClick={() => swiper.slidePrev()}
        sx={{
          position: 'absolute',
          top: 'calc(50% - 20px)',
          zIndex: 10000,
          left: 10,
          display: buttonStates.isBeginning ? 'none' : 'block',
        }}
      >
        <ArrowLeftIcon />
      </ButtonBase>
      <ButtonBase
        onClick={() => swiper.slideNext()}
        sx={{
          position: 'absolute',
          top: 'calc(50% - 20px)',
          zIndex: 10000,
          right: 10,
          display: buttonStates.isEnd ? 'none' : 'block',
        }}
      >
        <ArrowRightIcon />
      </ButtonBase>
    </>
  );
}
