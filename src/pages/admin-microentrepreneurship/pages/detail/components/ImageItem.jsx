import { ZoomInIcon } from '@/components/icons';
import { Box, ImageListItem } from '@mui/material';

export default function ImageItem({ src, handleOpen }) {
  return (
    <ImageListItem
      sx={{ borderRadius: '0.5rem', overflow: 'hidden', position: 'relative' }}
      onClick={handleOpen}
    >
      <img src={src} alt='' />
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <ZoomInIcon />
      </Box>
    </ImageListItem>
  );
}
