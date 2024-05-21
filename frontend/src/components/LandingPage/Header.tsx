import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Link as MuiLink,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleNavigation = (section: string) => {
    navigate('/', { state: { targetSection: section } });
  };

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
    setVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(mobileMenuAnchorEl)}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleNavigation('product')}>Product</MenuItem>
      <MenuItem onClick={() => handleNavigation('features')}>Features</MenuItem>
      <MenuItem onClick={() => handleNavigation('roadmap')}>Roadmap</MenuItem>
      <MenuItem onClick={() => handleNavigation('pricing')}>Pricing</MenuItem>
      <MenuItem
        component={RouterLink}
        to="/signup"
        onClick={handleMobileMenuClose}
      >
        <Button variant="contained" color="secondary">
          Get Started
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        top: visible ? 0 : '-64px',
        transition: 'top 0.3s',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <MuiLink
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.common.black,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                },
                mr: 2,
              }}
            >
              <img
                alt="Pollify Enterprise Logo"
                src="https://hangouthabit.sirv.com/polling_app/images/logo.png"
                style={{ height: '30px' }}
              />
            </MuiLink>
          </Box>
          <Box display={{ xs: 'none', md: 'flex' }} alignItems="center">
            <MuiLink
              component="button"
              onClick={() => handleNavigation('product')}
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
              Product
            </MuiLink>
            <MuiLink
              component="button"
              onClick={() => handleNavigation('features')}
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
              Features
            </MuiLink>
            <MuiLink
              component="button"
              onClick={() => handleNavigation('roadmap')}
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
              Roadmap
            </MuiLink>
            <MuiLink
              component="button"
              onClick={() => handleNavigation('pricing')}
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
              Pricing
            </MuiLink>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/signup"
            >
              Get Started
            </Button>
          </Box>
          <Box display={{ xs: 'flex', md: 'none' }} alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon sx={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      {renderMobileMenu}
    </AppBar>
  );
};

export default Header;
