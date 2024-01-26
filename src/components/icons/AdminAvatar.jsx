import { useAuth } from '@/contexts/AuthContext';
import { styled } from '@mui/material';

const StyledAvatar = styled('div')({
  backgroundColor: 'black',
  borderRadius: '50%',
  width: '35px',
  height: '35px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  marginLeft: 'auto',
  cursor: 'pointer',
});

const AdminAvatar = () => {
  const { user } = useAuth();

  const userAvatar = user ? `${user.firstName[0]}${user.lastName[0]}` : 'AD';

  return <StyledAvatar>{userAvatar}</StyledAvatar>;
};

export default AdminAvatar;
