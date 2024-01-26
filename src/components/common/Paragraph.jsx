import { Typography } from '@mui/material';

export default function Paragraph({ children, isFirst, sx }) {
  return (
    <>
      {!isFirst && <br />}
      <Typography component='p' variant='body1' sx={{ fontWeight: 400, ...sx }}>
        {children}
      </Typography>
    </>
  );
}
