import React, { useState } from 'react'; 
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem, Typography, AppBar, Toolbar } from '@mui/material';
import { useUser } from '../contexts/userContext';
import { useRouter } from 'next/router';  
import { logout } from '../services/api/auth';  

const Navbar = () => {
  const { user, loading } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter(); 
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => { 
    logout();
    handleClose(); 
    router.push('/login');
  };


  return (
    <AppBar position="static" color="default" elevation={4} sx={{ backgroundColor: '#f8f8f8', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ margin: '0 auto', maxWidth: 1280, width: '100%', padding: '0 24px' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.25rem' }}>
          TODO-APP
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ color: '#6200ea', fontSize: '1.5rem' }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Typography textAlign="center">{loading ? "Carregando..." : user?.nomeUsuario || "Usuário não encontrado"}</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>  
            <Typography textAlign="center" style={{ color: 'inherit', textDecoration: 'none' }}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
