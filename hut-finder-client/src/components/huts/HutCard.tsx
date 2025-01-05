import {AspectRatio, Card, CardProps, Typography} from '@mui/joy';
import ImageIcon from '@mui/icons-material/Image';
import React from 'react';

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
    />
  );
}

const HutCard = ({hut, ...props}: {hut : Hut} & CardProps) => {
  return (
    <Card {...props}>
      <div>
        <Typography level='title-lg'>{hut.name}</Typography>
        <Typography level='body-sm'>{hut.location}</Typography>
      </div>
      <AspectRatio minHeight='120px' maxHeight='200px'>
        {HutImage(hut)}
      </AspectRatio>
    </Card>
  )
}

export default HutCard;