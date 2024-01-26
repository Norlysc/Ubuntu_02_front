import { ArrowRightIcon } from '@/components/icons';
import { Box, ButtonBase, Divider, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Card({ id, title, date, managed }) {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Box
        padding='0.7rem 0.5rem 0.7rem 1rem'
        bgcolor='lightGray.main'
        borderRadius='1rem'
        display={'flex'}
        alignItems={'center'}
      >
        <Box flex={'1 1 auto'}>
          <Box display='flex' gap={'0.25rem'} alignItems={'center'} mb='0.5rem'>
            <Box
              sx={{
                width: '1rem',
                height: '1rem',
                borderRadius: '50%',
                bgcolor: managed ? 'success.main' : 'warning.main',
              }}
            />
            <Typography variant='h3' color='primary.main' fontWeight={700}>
              {title}
            </Typography>
          </Box>
          <Divider sx={{ width: '70%', bgcolor: 'primary.main', height: '1px' }} />
          <Box display='flex' justifyContent='space-between' mt='0.5rem'>
            <Typography variant='body2' lineHeight='1.5rem' width='80%' fontWeight={600}>
              {date}
            </Typography>
          </Box>
        </Box>
        <Link to={`../${id}`} style={{ flexShrink: '1.5rem' }}>
          <ButtonBase sx={{ width: '2rem', height: '2rem' }}>
            <ArrowRightIcon fill={'#090909'} />
          </ButtonBase>
        </Link>
      </Box>
    </Grid>
  );
}
