import { Box, Grid, useTheme } from '@mui/material';

/**
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Jsx content to render into the component.
 * @returns {JSX.ReactElement} - CardContainer component.
 **/

export default function CardContainer({ children }) {
  const { palette } = useTheme();

  return (
    <Grid item xs={12} sm={6}>
      <Box
        p='1rem 0.75rem 0.5rem'
        gap='1rem'
        display='flex'
        flexDirection='column'
        bgcolor={palette.lightGray.main}
        borderRadius='1rem'
      >
        {children}
      </Box>
    </Grid>
  );
}
