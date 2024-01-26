import { Divider, Grid, Typography } from '@mui/material';

export default function CategoriesCard({ text, value }) {
  return (
    <>
      <Grid container alignItems='center' sx={{ gap: '1rem', flexWrap: 'nowrap' }}>
        <Grid item xs={11}>
          <Typography variant='body1' sx={{ fontWeight: '400', lineHeight: '1.5625rem' }}>
            {text}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: '700', lineWeight: '1.5625rem' }}>
            {value}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ backgroundColor: 'success.main', my: '0.5rem' }} />
    </>
  );
}
