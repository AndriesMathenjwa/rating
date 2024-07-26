import React from 'react';
import Paper from '@mui/material/Paper';
import { Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Start() {
  return (
    <Paper
        sx={{
          p: 2,
          marginTop: '5%',
          marginLeft: '5%',
          marginRight: '5%',
          marginBottom: '5%', // Added margin bottom
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: '#93AB4F',
          color: 'white',
        }}
      >
        <Typography sx={{ marginTop: '5%' }} variant="h4" component="h1" gutterBottom>
          GEPF Event Registration Form
        </Typography>
        <Divider />
        <Link to="/">
            <Button
                variant="contained"
                sx={{
                backgroundColor: '#FFFFFF',
                color: '#93AB4F',
                marginTop: '1rem',
                marginBottom: '1rem',
                '&:hover': {
                    backgroundColor: '#DF6E46',
                }
                }}
            >
                Start
            </Button>
        </Link>
      </Paper>
  )
}

export default Start