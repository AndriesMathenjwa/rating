import React, { useState } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const customTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            borderColor: 'green',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'green',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'green',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'green',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#93AB4F',
          '&.Mui-checked': {
            color: '#93AB4F',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#93AB4F',
          '&.Mui-checked': {
            color: '#93AB4F',
          },
        },
      },
    },
  },
});

const HamburgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={handleClick}
        sx={{ 
          marginLeft: '10%', 
          color: 'green', 
          '&:hover': {
            backgroundColor: '#FFBB92',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/re-print" style={{ textDecoration: 'none', color: 'inherit' }}>
            Re-Print
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/verification" style={{ textDecoration: 'none', color: 'inherit' }}>
            Verification
          </Link>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Link to="/re-print" style={{ textDecoration: 'none', color: 'inherit' }}>
            End of event
          </Link>
        </MenuItem> */}
      </Menu>
    </div>
  );
};

const AppBar = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <MuiAppBar position="fixed">
        <Toolbar
          sx={{
            pr: '24px', // Keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="black" // Ensure the text color is set to black for visibility
            noWrap
            sx={{ flexGrow: 1 }}
          >
            GEPF
          </Typography>
          <Link to="/">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#93AB4F',
                marginRight: '2%',
                '&:hover': {
                  backgroundColor: '#DF6E46',
                },
              }}
            >
              Start
            </Button>
          </Link>
          {/* <HamburgerMenu /> */}
        </Toolbar>
      </MuiAppBar>
    </ThemeProvider>
  );
};

export default AppBar;
