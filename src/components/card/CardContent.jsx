import { styled, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

const StyledAccordion = styled(Accordion)(() => ({
  '.MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded': {
    margin: '0',
  },
}));

/**
 * @param {object} props Component props.
 * @param {React.ReactNode} props.header The header content of the card.
 * @param {React.ReactNode} props.content The complete content of the card.
 * @param {boolean} props.isExpanded If true, expands the accordion, otherwise collapse it.
 * @returns {JSX.ReactElement} CardContent component.
 **/

export default function CardContent({ header, content, isExpanded }) {
  return (
    <StyledAccordion sx={{ boxShadow: 0, bgcolor: 'lightGray.main' }} expanded={isExpanded}>
      <AccordionSummary
        sx={{
          p: 0,
          userSelect: 'auto',
          cursor: 'default !important',
        }}
      >
        {header}
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>{content}</AccordionDetails>
    </StyledAccordion>
  );
}
