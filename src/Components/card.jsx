import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import GEPF from '../Images/Gepf main.png';

function MediaCard() {
  return (
    <Card sx={{ width: '90%', maxWidth: '600px', margin: 'auto'}}>
      <CardMedia
        component="img"
        sx={{ 
          width: '100%',
          height: 'auto',
        }}
        image={GEPF}
        title="GEPF"
      />
    </Card>
  );
}

export default MediaCard;