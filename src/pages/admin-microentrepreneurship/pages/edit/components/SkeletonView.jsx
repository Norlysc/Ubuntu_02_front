import { Box, Skeleton } from '@mui/material';

export default function SkeletonView() {
  return (
    <Box>
      <Box mt={'1.5rem'}>
        <Box display='flex' flexDirection='column' gap='1.5rem' my='1.5rem'>
          <Skeleton variant='rounded' width={'100%'} height={56} />
          <Skeleton variant='rounded' width={'100%'} height={56} />
          <Skeleton variant='rounded' width={'100%'} height={56} />
          <Skeleton variant='rounded' width={'100%'} height={56} />
          <Skeleton variant='rounded' width={'100%'} height={150} />
          <Skeleton variant='rounded' width={'100%'} height={150} />
        </Box>
        <Box display={'flex'} gap={'0.5rem'}>
          <Skeleton variant='rounded' height={80} sx={{ flex: ' 1 1 auto' }} />
          <Skeleton variant='rounded' height={80} sx={{ flex: ' 1 1 auto' }} />
          <Skeleton variant='rounded' height={80} sx={{ flex: ' 1 1 auto' }} />
        </Box>
      </Box>
    </Box>
  );
}
