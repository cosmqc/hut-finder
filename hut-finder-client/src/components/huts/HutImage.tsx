import React from 'react';
import ImageIcon from '@mui/icons-material/Image';

const HutImage = (hut: Hut): React.ReactNode => {
  if (hut.imageUrl === null || hut.imageUrl === '') {
    return (
      <ImageIcon sx={{fontSize: '3rem', opacity: 0.2}}/>
    );
  }
  return (
    <img
      src={hut.imageUrl}
      alt={hut.name}
      loading='lazy'
    />
  );
};

export default HutImage;