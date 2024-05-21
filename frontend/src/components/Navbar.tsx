import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/usersSlice';
import { AppDispatch, RootState } from '../app/store';
import {
  Container,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Link as MuiLink,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser,
  );
  const navigate = useNavigate();
  const theme = useTheme();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
    navigate('/');
  };

  const handleLoginSignup = () => {
    navigate('/login');
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const profileMenuId = 'primary-search-account-menu-profile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={RouterLink} to="/" onClick={handleMobileMenuClose}>
        <img
          alt="Pollify Enterprise Logo"
          src="https://hangouthabit.sirv.com/polling_app/images/logo.png"
          style={{ height: '30px', marginRight: '10px' }}
        />
      </MenuItem>
      <MenuItem
        component={RouterLink}
        to="/create"
        onClick={handleMobileMenuClose}
      >
        <MuiLink color="textPrimary" underline="none" sx={{ color: theme.palette.text.secondary }}>Create Poll</MuiLink>
      </MenuItem>
      <MenuItem
        component={RouterLink}
        to="/leaderboard"
        onClick={handleMobileMenuClose}
      >
        <MuiLink color="textPrimary" underline="none" sx={{ color: theme.palette.text.secondary }}>Leaderboard</MuiLink>
      </MenuItem>
    </Menu>
  );

  const renderProfileMenu = (
    <Menu
      anchorEl={profileMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem
        component={RouterLink}
        to="/settings"
        onClick={handleProfileMenuClose}
      >
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default }}>
      <Container>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', md: 'none' }, color: theme.palette.text.primary }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MuiLink
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                mr: 2,
              }}
            >
              <img
                alt="Pollify Enterprise Logo"
                src="https://hangouthabit.sirv.com/polling_app/images/logo.png"
                style={{ height: '30px' }}
              />
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/create"
              sx={{
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.common.black,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                },
                mr: 2,
              }}
            >
              Create Poll
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/leaderboard"
              sx={{
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.common.black,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                },
                mr: 2,
              }}
            >
              Leaderboard
            </MuiLink>
          </Box>
          {currentUser ? (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={profileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                sx={{ color: theme.palette.text.primary }}
              >
                <Avatar src={currentUser.avatar_url} />
              </IconButton>
            </Box>
          ) : (
            <Button
              onClick={handleLoginSignup}
              sx={{ display: { xs: 'block', sm: 'block' }, ml: 'auto', color: theme.palette.text.secondary }}
            >
              Login/Signup
            </Button>
          )}
        </Toolbar>
        {renderMobileMenu}
        {renderProfileMenu}
      </Container>
    </AppBar>
  );
};

export default Navbar;
