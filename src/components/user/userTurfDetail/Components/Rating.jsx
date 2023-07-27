import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function RatingComponent({rating, setRating}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: '8px' }}>
        Rating
      </Typography>
      <Rating
        name="rating"
        value={rating} // Make sure this is correct and not being overwritten
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <Typography variant="body1" sx={{ marginLeft: '8px' }}>
         {rating}
      </Typography>
    </Box>
  );
}





