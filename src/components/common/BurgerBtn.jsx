import { IconButton, styled } from '@mui/material';

const StyledBurgerBtn = styled(IconButton)(({ active }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  zIndex: 100000000,

  '& div': {
    width: '1.5rem',
    height: '2px',
    opacity: 1,
    background: active ? 'black' : 'black',
    transition: 'all 0.3s ease',
  },

  '& div:first-of-type': {
    transform: active ? 'rotate(-45deg) translate(-7px, 2px)' : 'none',
  },

  '& div:nth-of-type(2)': {
    opacity: active ? '0' : '1',
  },

  '& div:nth-of-type(3)': {
    transform: active ? 'rotate(45deg) translate(-7px, -2px)' : 'none',
  },
}));

export default function BurgerBtn({ isActive, handleShowMenu }) {
  return (
    <StyledBurgerBtn active={isActive ? 1 : undefined} onClick={handleShowMenu}>
      <div></div>
      <div></div>
      <div></div>
    </StyledBurgerBtn>
  );
}
