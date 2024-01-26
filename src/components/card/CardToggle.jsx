import { Box, Button } from '@mui/material';

/**
 * @param {object} props Component props.
 * @param {boolean} props.isExpanded Controls the state of the render button.
 * @param {Function} props.onClick Is the function that will be executed when toggled.
 * @param {React.ReactNode} props.renderButton Is the content that will be rendered inside the button.
 * @returns {JSX.ReactElement} CardToggle component.
 **/

export default function CardToggle({ isExpanded, onClick, renderButton }) {
  return (
    <Box display='flex' justifyContent='center'>
      <Button
        sx={{
          width: '9.5rem',
          height: '2.5rem',
          textTransform: 'none',
        }}
        onClick={onClick}
      >
        {renderButton(isExpanded)}
      </Button>
    </Box>
  );
}
