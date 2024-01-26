import useFetch from '@/hooks/useFetch';
import { Box, Typography, Divider, Skeleton } from '@mui/material';

export default function EstatisticsCard({ borderColor, text, method }) {
  const jwt = localStorage.getItem('token');
  const { data, loading } = useFetch({
    queryFn: ({ abortController }) => method({ abortController, jwt }),
  });

  if (loading === true) {
    return <Skeleton sx={{ height: '78px', borderRadius: '0.5rem', transform: 'none' }} />;
  }
  return (
    <Box sx={{ padding: '0.5rem', border: `2px solid ${borderColor}`, borderRadius: '0.5rem' }}>
      <Box>
        <Typography variant='h3' sx={{ fontWeight: '400' }}>
          {text}
        </Typography>
        <Divider
          sx={{ width: '35%', backgroundColor: borderColor, my: '0.2rem ', height: '2px' }}
        />
        <Typography sx={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: '1.5625rem' }}>
          {data}
        </Typography>
      </Box>
    </Box>
  );
}
