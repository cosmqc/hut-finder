import {AspectRatio, Card, CardContent, CardOverflow, CardProps, Link, Typography} from '@mui/joy';
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
      loading="lazy"
    />
  );
};

const HutCard = ({hut, ...props}: { hut: Hut } & CardProps) => {
  return (
    <Card {...props}>
      <CardOverflow>
        <AspectRatio ratio="2">
          {HutImage(hut)}
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Link
          overlay
          underline='none'
          href={`/huts/${hut.id}`}
        >
          <Typography level="title-md">{hut.name}</Typography>
        </Link>
        <Typography level="body-sm" sx={{textAlign: 'left'}}>{hut.location}</Typography>
      </CardContent>
    </Card>
  );
};

export default HutCard;