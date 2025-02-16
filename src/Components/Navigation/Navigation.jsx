import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" color="transparent" elevation={0} className="main-nav">
      <Toolbar>
        <Button
          onClick={() => navigate('/')}
          color={location.pathname === '/' ? 'primary' : 'inherit'}
          variant={location.pathname === '/' ? 'contained' : 'text'}
        >
          Home
        </Button>
        <Button
          onClick={() => navigate('/favorites')}
          color={location.pathname === '/favorites' ? 'primary' : 'inherit'}
          variant={location.pathname === '/favorites' ? 'contained' : 'text'}
        >
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
} 