import useOutsideClick from '@/hooks/useOutsideClick';
import ImageSlider from '@/pages/admin-microentrepreneurship/pages/detail/components/ImageSlider';
import { Backdrop } from '@mui/material';

export default function ImageBackdrop({ open, images, initialSlide, handleClose }) {
  const ref = useOutsideClick(handleClose);

  return (
    <Backdrop open={open} sx={{ background: 'black', zIndex: '1' }}>
      {open && (
        <ImageSlider
          ref={ref}
          images={images}
          style={{ borderRadius: '0', height: '15rem' }}
          pagination={false}
          initialSlide={initialSlide}
        />
      )}
    </Backdrop>
  );
}
