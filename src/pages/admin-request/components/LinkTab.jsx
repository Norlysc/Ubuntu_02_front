import { Tab } from '@mui/material';
import { Link } from 'react-router-dom';

export default function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}
