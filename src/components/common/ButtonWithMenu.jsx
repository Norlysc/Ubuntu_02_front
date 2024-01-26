import { MenuIcon } from '@/components/icons';
import { useBoolean } from '@/hooks/useBoolean';
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  List,
  ListItem,
  Tooltip,
  Typography,
  styled,
  Link,
  Zoom,
} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const StyledButton = styled(ButtonBase)(({ theme, open }) => ({
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  backgroundColor: open ? theme.palette.primary.main : 'transparent',
  transition: 'background 0.2s ease',

  '& path': {
    transition: 'fill 0.1s ease',
    fill: open ? theme.palette.background.paper : theme.palette.text.main,
  },
}));

export default function ButtonWithMenu({ editRoute = 'edit', onHidden = () => null, storedState }) {
  const { value: open, setFalse: handleTooltipClose, toggle: handleTooltioToggle } = useBoolean();

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: 'white',
              padding: 0,
              '&.MuiTooltip-tooltipPlacementBottom.MuiTooltip-tooltipPlacementBottom': {
                marginTop: '0.25rem',
              },
            },
          },
          popper: {
            sx: {
              '.MuiTooltip-tooltipPlacementBottom': {
                transformOrigin: 'top right !important',
              },
            },
          },
        }}
        PopperProps={{
          disablePortal: true,
        }}
        TransitionComponent={Zoom}
        placement='bottom-end'
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={<MenuOptions editRoute={editRoute} onHidden={onHidden} storedState={storedState} />}
      >
        <StyledButton onClick={handleTooltioToggle} open={open}>
          <MenuIcon />
        </StyledButton>
      </Tooltip>
    </ClickAwayListener>
  );
}

function MenuOptions({ storedState, editRoute, onHidden }) {
  return (
    <Box>
      <List sx={{ padding: '0' }}>
        <ListItem
          sx={{
            height: '2.5rem',
            width: '7.5rem',
            padding: '0 0 0 1rem',
            transition: 'background 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgb(0,0,0,0.05)',
            },
          }}
        >
          <Link
            component={NavLink}
            to={editRoute}
            state={storedState}
            underline='none'
            sx={{
              flex: '1 1 auto',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant='body2' color='text.primary'>
              Editar
            </Typography>
          </Link>
        </ListItem>
        <ListItem
          sx={{
            height: '2.5rem',
            width: '7.5rem',
            padding: '0 0 0 1rem',
            transition: 'background 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgb(0,0,0,0.05)',
            },
          }}
        >
          <ButtonBase
            onClick={onHidden}
            sx={{
              flex: '1 1 auto',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant='body2' color='text.primary'>
              Ocultar
            </Typography>
          </ButtonBase>
        </ListItem>
      </List>
    </Box>
  );
}
